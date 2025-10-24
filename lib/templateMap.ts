import TemplateOne from "@/components/templatescv/TemplateOne";
import TemplateTwo from "@/components/templatescv/TemplateTwo";
// 10 templates
export const templateMap: Record<
  string,
  React.FC<{ content: any; resumeId?: string }>
> = {
  "Template One": TemplateOne,
  "Template Two": TemplateTwo,
};
