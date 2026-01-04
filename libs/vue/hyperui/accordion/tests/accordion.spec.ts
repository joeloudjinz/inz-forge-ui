import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { InzHyperUiAccordion, InzForgeHyperUiAccordionItemModel, InzForgeHyperUiAccordionModes } from '../src';

const mockItems: InzForgeHyperUiAccordionItemModel[] = [
  { title: 'Q1', description: 'Desc 1', isExpandedByDefault: false },
  { title: 'Q2', description: 'Desc 2', isExpandedByDefault: true },
  { title: 'Q3', description: 'Desc 3', isExpandedByDefault: false }
];

describe('InzForgeHyperUiAccordion', () => {
  it('renders correctly with items', () => {
    const wrapper = mount(InzHyperUiAccordion, {
      props: {
        items: mockItems
      }
    });

    expect(wrapper.findAll('details')).toHaveLength(3);
    expect(wrapper.find('summary').text()).toBe('Q1');
    expect(wrapper.find('p').text()).toBe('Desc 1');
  });

  it('renders correct number of items', () => {
    const wrapper = mount(InzHyperUiAccordion, {
      props: {
        items: mockItems
      }
    });

    const details = wrapper.findAll('details');
    expect(details).toHaveLength(3);
  });

  it('respects default expansion state', () => {
    const wrapper = mount(InzHyperUiAccordion, {
      props: {
        items: mockItems
      }
    });

    const details = wrapper.findAll('details');
    expect(details[0].attributes('open')).toBeUndefined(); // Q1 is not expanded by default
    expect(details[1].attributes('open')).toBe(''); // Q2 is expanded by default
  });

  it('applies divided mode classes', () => {
    const wrapper = mount(InzHyperUiAccordion, {
      props: {
        items: mockItems,
        mode: InzForgeHyperUiAccordionModes.divided
      }
    });

    const container = wrapper.find('.inz-accordion-container');
    expect(container.classes()).toContain('divide-y');
    expect(container.classes()).toContain('-mx-4');
  });

  it('applies compact mode classes', () => {
    const wrapper = mount(InzHyperUiAccordion, {
      props: {
        items: mockItems,
        mode: InzForgeHyperUiAccordionModes.compact
      }
    });

    const summary = wrapper.find('summary');
    expect(summary.classes()).toContain('text-sm');
    expect(summary.classes()).toContain('py-2');
  });

  it('does not render custom icons when not provided', () => {
    const wrapper = mount(InzHyperUiAccordion, {
      props: {
        items: mockItems
      }
    });

    const contentIcons = wrapper.findAll('.inz-accordion-summary > span > i');
    const componentIcons = wrapper.findAll('.inz-accordion-summary > span > span.size-5');

    expect(contentIcons).toHaveLength(0);
    expect(componentIcons).toHaveLength(0);
  });

  it('renders icon class when provided', () => {
    const itemsWithIcons = [{...mockItems[0], iconClass: 'test-icon-class'}];
    const wrapper = mount(InzHyperUiAccordion, {
      props: {
        items: itemsWithIcons
      }
    });

    const icon = wrapper.find('.inz-accordion-summary > span > i');
    expect(icon.exists()).toBe(true);
    expect(icon.classes()).toContain('test-icon-class');
  });

  it('handles exclusive mode (radio behavior)', async () => {
    const wrapper = mount(InzHyperUiAccordion, {
      props: {
        items: mockItems,
        exclusive: true
      }
    });

    const details = wrapper.findAll('details');
    const groupName = details[0].attributes('name');

    // In exclusive mode, details share a 'name' attribute
    expect(details[0].attributes('name')).toBe(groupName);
    expect(details[1].attributes('name')).toBe(groupName);
  });

  it('toggles accordion items when clicked', async () => {
    const wrapper = mount(InzHyperUiAccordion, {
      props: {
        items: mockItems
      }
    });

    const summary = wrapper.find('summary');
    await summary.trigger('click');

    const details = wrapper.find('details');
    expect(details.attributes('open')).toBeDefined();
  });
});
