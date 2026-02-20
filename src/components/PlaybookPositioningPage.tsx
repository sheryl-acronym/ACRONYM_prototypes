import React from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { PanelLeft, BookOpen, Plus, Trash2 } from 'lucide-react';

const parseMarkdown = (text: string): React.ReactNode[] => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Bold text (**text**)
    if (line.includes('**')) {
      const parts = line.split(/\*\*(.*?)\*\*/);
      const rendered = parts.map((part, idx) => (idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part));
      elements.push(
        <span key={i} className="block mb-2">
          {rendered}
        </span>
      );
    }
    // Bullet points (- text)
    else if (line.startsWith('- ')) {
      elements.push(
        <span key={i} className="flex items-start gap-2 mb-2">
          <span className="flex-shrink-0 text-slate-400">&bull;</span>
          <span>{line.slice(2)}</span>
        </span>
      );
    }
    // Headings (# text)
    else if (line.startsWith('# ')) {
      elements.push(
        <h3 key={i} className="text-base font-semibold mb-2">
          {line.slice(2)}
        </h3>
      );
    }
    else if (line.startsWith('## ')) {
      elements.push(
        <h4 key={i} className="text-sm font-semibold mb-2">
          {line.slice(3)}
        </h4>
      );
    }
    // Empty lines
    else if (line.trim() === '') {
      elements.push(<span key={i} className="block mb-2" />);
    }
    // Regular text
    else {
      elements.push(
        <span key={i} className="block mb-2">
          {line}
        </span>
      );
    }

    i++;
  }

  return elements;
};

const EditableText: React.FC<{
  value: string;
  className?: string;
  onChange?: (value: string) => void;
}> = ({ value, className, onChange }) => {
  const [editing, setEditing] = React.useState(false);
  const [text, setText] = React.useState(value);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleBlur = () => {
    setEditing(false);
    onChange?.(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      setText(value);
      setEditing(false);
    }
  };

  React.useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [editing]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  if (editing) {
    return (
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full resize-none py-1 px-2 text-sm border border-slate-300 rounded bg-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-0 font-inherit ${className || ''}`}
        style={{ fontFamily: 'inherit' }}
        placeholder="Use markdown: **bold**, - bullets, # headings"
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      className={`cursor-text rounded px-1 -mx-1 py-0.5 hover:bg-muted/50 transition-colors inline ${className || ''}`}
    >
      {parseMarkdown(text)}
    </span>
  );
};

export const PlaybookPositioningPage: React.FC = () => {
  const [content, setContent] = React.useState({
    companyOverview: 'Flex is a fintech payment infrastructure company that specializes in enabling Health Savings Account (HSA) and Flexible Spending Account (FSA) payments for e-commerce businesses. The platform serves as a comprehensive payment solution specifically designed for the health and wellness industry.',
    coreValueProposition: 'Flex helps merchants increase revenue by making HSA/FSA payments seamless at checkout. Their key selling points include:',
    conversionLift: '30% increase in checkout completion rates',
    aov: '50% increase when customers use health benefit funds',
    retention: '92% of customers indicate they\'ll return due to HSA/FSA availability',
    returns: '10% decrease in returns when pre-tax dollars are used',
    offering1Title: '1. Effortless HSA/FSA Payments',
    offering1Desc: 'Seamless payment processing with automatic handling of split cards and subscriptions',
    offering2Title: '2. Autopilot Compliance',
    offering2Desc: 'Automatic eligibility verification before and after purchase, with auto-generated Letters of Medical Necessity',
    offering3Title: '3. Smarter Insights',
    offering3Desc: 'Analytics dashboards to identify customer spending trends and revenue opportunities',
    targetIndustries: 'Fitness, wellness, skincare, supplements, footwear, home wellness products, and sleep-related items',
    positioning1: 'API-first, fully customizable platform',
    positioning2: 'Integrates with major e-commerce platforms (Shopify, WooCommerce, RevenueCat, etc.)',
    positioning3: 'Built for enterprise scale supporting subscriptions, high-volume transactions, and recurring payments',
    positioning4: 'Quick implementation with clear documentation and dedicated support',
    differentiator: 'Flex positions itself as the "only HSA/FSA payments infrastructure built for top health and wellness brands," offering the most comprehensive compliance and integration solution in their niche market.',
  });

  const [customSections, setCustomSections] = React.useState<Array<{ id: string; title: string; content: string }>>([]);

  const addSection = () => {
    const newId = Date.now().toString();
    setCustomSections([...customSections, { id: newId, title: 'New Section', content: '' }]);
  };

  const updateSection = (id: string, field: 'title' | 'content', value: string) => {
    setCustomSections(
      customSections.map((section) => (section.id === id ? { ...section, [field]: value } : section))
    );
  };

  const deleteSection = (id: string) => {
    setCustomSections(customSections.filter((section) => section.id !== id));
  };

  return (
    <div className="flex flex-1 min-h-screen relative flex-col">
      {/* Header - sticky */}
      <div className="sticky top-0 z-20 flex-shrink-0 h-[50px] flex items-center px-3 bg-white border-b border-slate-200">
        <SidebarTrigger className="h-8 w-8 p-1.5 hover:bg-slate-100 rounded transition-colors">
          <PanelLeft className="h-4 w-4" />
        </SidebarTrigger>
        <div className="flex-1 flex items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={(e) => e.preventDefault()}>
                  Playbook
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Positioning</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 bg-white overflow-y-auto">
          <div className="max-w-[1040px] mx-auto px-8 py-4 pb-24 w-full">
            {/* Page header */}
            <div className="mb-8 pt-4">
              {/* Title */}
              <div className="flex items-center gap-2.5 mb-6">
                <BookOpen className="h-5 w-5 text-foreground" />
                <h1 className="text-2xl font-bold text-foreground">Positioning</h1>
              </div>
            </div>

            {/* Content */}

            {/* Company Overview Section */}
            <section className="mb-8">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
                Company Overview
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                <EditableText
                  value={content.companyOverview}
                  onChange={(val) => setContent({...content, companyOverview: val})}
                />
              </p>
            </section>

            <Separator className="my-6" />

            {/* Core Value Proposition Section */}
            <section className="mb-8">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
                Core Value Proposition
              </h2>
              <div className="text-sm text-foreground/80">
                <EditableText
                  value={`${content.coreValueProposition}
- Conversion Lift: ${content.conversionLift}
- Average Order Value: ${content.aov}
- Customer Retention: ${content.retention}
- Returns Reduction: ${content.returns}`}
                  onChange={(val) => {
                    const lines = val.split('\n');
                    const mainText = lines[0] || '';

                    let conversionLift = content.conversionLift;
                    let aov = content.aov;
                    let retention = content.retention;
                    let returns = content.returns;

                    lines.forEach((line) => {
                      if (line.startsWith('- Conversion Lift:')) {
                        conversionLift = line.replace('- Conversion Lift:', '').trim();
                      } else if (line.startsWith('- Average Order Value:')) {
                        aov = line.replace('- Average Order Value:', '').trim();
                      } else if (line.startsWith('- Customer Retention:')) {
                        retention = line.replace('- Customer Retention:', '').trim();
                      } else if (line.startsWith('- Returns Reduction:')) {
                        returns = line.replace('- Returns Reduction:', '').trim();
                      }
                    });

                    setContent({
                      ...content,
                      coreValueProposition: mainText,
                      conversionLift,
                      aov,
                      retention,
                      returns,
                    });
                  }}
                />
              </div>
            </section>

            <Separator className="my-6" />

            {/* Product/Service Offerings Section */}
            <section className="mb-8">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground/60 mb-4">
                Product/Service Offerings
              </h2>
              <div className="text-sm text-foreground/80">
                <EditableText
                  value={`${content.offering1Title}\n${content.offering1Desc}\n\n${content.offering2Title}\n${content.offering2Desc}\n\n${content.offering3Title}\n${content.offering3Desc}`}
                  onChange={(val) => {
                    const sections = val.split('\n\n');
                    const offerings: { title: string; desc: string }[] = [];

                    sections.forEach((section) => {
                      const lines = section.split('\n').filter(line => line.trim());
                      if (lines.length >= 1) {
                        offerings.push({
                          title: lines[0],
                          desc: lines.slice(1).join('\n'),
                        });
                      }
                    });

                    setContent({
                      ...content,
                      offering1Title: offerings[0]?.title || '',
                      offering1Desc: offerings[0]?.desc || '',
                      offering2Title: offerings[1]?.title || '',
                      offering2Desc: offerings[1]?.desc || '',
                      offering3Title: offerings[2]?.title || '',
                      offering3Desc: offerings[2]?.desc || '',
                    });
                  }}
                />
              </div>
            </section>

            <Separator className="my-6" />

            {/* Target Industries Section */}
            <section className="mb-8">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
                Target Industries
              </h2>
              <p className="text-sm text-foreground/80">
                <EditableText
                  value={content.targetIndustries}
                  onChange={(val) => setContent({...content, targetIndustries: val})}
                />
              </p>
            </section>

            <Separator className="my-6" />

            {/* Technical Positioning Section */}
            <section className="mb-8">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
                Technical Positioning
              </h2>
              <div className="text-sm text-foreground/80 whitespace-pre-wrap">
                <EditableText
                  value={`${content.positioning1}\n${content.positioning2}\n${content.positioning3}\n${content.positioning4}`}
                  onChange={(val) => {
                    const lines = val.split('\n');
                    setContent({
                      ...content,
                      positioning1: lines[0] || '',
                      positioning2: lines[1] || '',
                      positioning3: lines[2] || '',
                      positioning4: lines[3] || '',
                    });
                  }}
                />
              </div>
            </section>

            <Separator className="my-6" />

            {/* Key Differentiator Section */}
            <section className="mb-12">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
                Key Differentiator
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                <EditableText
                  value={content.differentiator}
                  onChange={(val) => setContent({...content, differentiator: val})}
                />
              </p>
            </section>

            {/* Custom Sections Divider */}
            {customSections.length > 0 && <Separator className="my-8" />}

            {/* Custom Sections */}
            {customSections.map((section) => (
              <section key={section.id} className="mb-8 group">
                <div className="flex items-center gap-0 mb-3 group/header -mx-2 px-2 py-1 rounded group-hover/header:bg-muted/50 transition-colors">
                  <h2 className="flex-1 text-sm font-medium uppercase tracking-wide text-muted-foreground/60">
                    <EditableText
                      value={section.title}
                      onChange={(val) => updateSection(section.id, 'title', val)}
                    />
                  </h2>
                  <button
                    onClick={() => deleteSection(section.id)}
                    className="opacity-0 group-hover/header:opacity-100 transition-opacity text-muted-foreground hover:text-foreground flex-shrink-0"
                    title="Delete section"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-sm text-foreground/80">
                  <EditableText
                    value={section.content}
                    onChange={(val) => updateSection(section.id, 'content', val)}
                  />
                </div>
                <Separator className="my-6" />
              </section>
            ))}

            {/* Add Section Button */}
            <div className="mb-12 pt-4">
              <Button
                onClick={addSection}
                variant="outline"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Section
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybookPositioningPage;
