import { ComponentFixture, TestBed } from '@angular/core/testing';
import { select } from 'd3-selection';

import { Mocks, TestModule, TestUtility } from 'src/tests';
import { AppSharedModule } from '~/app-shared.module';
import {
  sankeyCenter,
  sankeyJustify,
  sankeyLeft,
  sankeyRight,
} from '~/d3-sankey';
import { spread } from '~/helpers';
import { FlowDiagram, SankeyAlign } from '~/models';
import { FlowComponent, SVG_ID } from './flow.component';

describe('FlowComponent', () => {
  let component: FlowComponent;
  let fixture: ComponentFixture<FlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestModule, AppSharedModule, FlowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowComponent);
    component = fixture.componentInstance;
    component.themeSvc.themeValues$.next(Mocks.ThemeValues);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rebuildChart', () => {
    it('should call to rebuild the sankey', () => {
      spyOn(component, 'rebuildSankey');
      component.rebuildChart(Mocks.Flow, Mocks.ThemeValues, Mocks.FlowSettings);
      expect(component.rebuildSankey).toHaveBeenCalledWith(
        Mocks.Flow,
        Mocks.FlowSettings,
      );
    });

    it('should call to rebuild the box-line', () => {
      spyOn(component, 'rebuildBoxLine');
      component.rebuildChart(
        Mocks.Flow,
        Mocks.ThemeValues,
        spread(Mocks.FlowSettings, { diagram: FlowDiagram.BoxLine }),
      );
      expect(component.rebuildBoxLine).toHaveBeenCalledWith(
        Mocks.Flow,
        Mocks.ThemeValues,
      );
    });
  });

  describe('rebuildSankey', () => {
    beforeEach(() => {
      select(`#${SVG_ID} > *`).remove();
    });

    it('should build the sankey', () => {
      component.rebuildSankey(Mocks.Flow, Mocks.FlowSettings);
      const gElements = document.getElementsByTagName('g');
      expect(gElements.length).toEqual(14);
    });

    it('should handle drag and drop', () => {
      component.rebuildSankey(Mocks.Flow, Mocks.FlowSettings);
      TestUtility.dragAndDropSelector(fixture, 'rect', 100, 200);
      TestUtility.assert(component.svg != null);
      expect(component.svg.select('rect').attr('transform')).toBeTruthy();
      expect(
        component.svg.select('#image-r\\|0').attr('transform'),
      ).toBeTruthy();
    });

    it('should handle zoom', () => {
      component.rebuildSankey(Mocks.Flow, Mocks.FlowSettings);
      TestUtility.zoomSelector(fixture, 'svg', 500);
      TestUtility.assert(component.svg != null);
      expect(component.svg.select('g').attr('transform')).toBeTruthy();
    });

    it('should call setSelected when a rect is clicked', () => {
      component.rebuildSankey(Mocks.Flow, Mocks.FlowSettings);
      TestUtility.altClickSelector(fixture, 'rect');
      expect(component.selectedId()).toEqual(Mocks.Flow.nodes[0].stepId);
    });

    it('should not call setSelected emit when default is prevented', () => {
      component.rebuildSankey(Mocks.Flow, Mocks.FlowSettings);
      spyOn(component.selectedId, 'set');
      TestUtility.altClickSelector(fixture, 'rect', 0, true);
      expect(component.selectedId.set).not.toHaveBeenCalled();
    });
  });

  describe('rebuildBoxLine', () => {
    it('should build the chart from flow data', () => {
      const promise = Promise.resolve({
        children: [{ id: 'r|0', x: 1, y: 2 }],
      } as any);
      spyOn(component, 'getElk').and.returnValue({
        layout: () => promise,
      } as any);
      component.rebuildBoxLine(Mocks.Flow, Mocks.ThemeValues);
      expect(component.getElk).toHaveBeenCalled();
    });

    it('should handle null elk layout', () => {
      const promise = Promise.resolve({
        children: null,
      } as any);
      spyOn(component, 'getElk').and.returnValue({
        layout: () => promise,
      } as any);
      component.rebuildBoxLine(Mocks.Flow, Mocks.ThemeValues);
      expect(component.getElk).toHaveBeenCalled();
    });
  });

  describe('getVisNodeClickFn', () => {
    it('should next selectedId$ subject', () => {
      component.getVisNodeClickFn('id')();
      expect(component.selectedId()).toEqual('id');
    });
  });

  describe('getElk', () => {
    it('should create', () => {
      expect(component.getElk()).toBeTruthy();
    });
  });

  describe('foreColor', () => {
    it('should return appropriate color for background', () => {
      expect(component.foreColor('#000000')).toEqual('#fff');
      expect(component.foreColor('#ffffff')).toEqual('#000');
    });
  });

  describe('getAlign', () => {
    it('should return the proper sankey alignment function', () => {
      expect(component.getAlign(SankeyAlign.Justify)).toEqual(sankeyJustify);
      expect(component.getAlign(SankeyAlign.Left)).toEqual(sankeyLeft);
      expect(component.getAlign(SankeyAlign.Right)).toEqual(sankeyRight);
      expect(component.getAlign(SankeyAlign.Center)).toEqual(sankeyCenter);
    });
  });

  describe('nodeHeight', () => {
    it('should handle valid or nullish values', () => {
      const valid: any = { y1: 5, y0: 0 };
      const invalid: any = {};
      expect(component.nodeHeight(valid)).toEqual(5);
      expect(component.nodeHeight(invalid)).toEqual(0);
    });
  });
});
