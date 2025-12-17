import { JSDOM } from 'jsdom';
import * as d3 from 'd3';

export const SVG_NS = 'http://www.w3.org/2000/svg';

export type SvgSelection = d3.Selection<SVGSVGElement, unknown, null, undefined>;

export interface SvgDocument {
  dom: JSDOM;
  svgElement: SVGSVGElement;
  svg: SvgSelection;
}

export function createSvgDocument(width: number, height: number): SvgDocument {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  const { document } = dom.window;

  const svgElement = document.createElementNS(SVG_NS, 'svg') as unknown as SVGSVGElement;
  svgElement.setAttribute('xmlns', SVG_NS);
  svgElement.setAttribute('width', String(width));
  svgElement.setAttribute('height', String(height));
  svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);

  document.body.appendChild(svgElement as unknown as Node);

  return {
    dom,
    svgElement,
    svg: d3.select(svgElement),
  };
}

export interface RenderToSvgStringOptions {
  width: number;
  height: number;
  draw: (svg: SvgSelection) => void;
}

export function renderToSvgString(options: RenderToSvgStringOptions): string {
  const { svgElement, svg } = createSvgDocument(options.width, options.height);
  options.draw(svg);
  return svgElement.outerHTML;
}

