import TemplateOne from "@/components/cvtemplates/TemplateOne";
import TemplateTwo from "@/components/cvtemplates/TemplateTwo";
// 10 templates
export const templateMap: Record<
  string,
  React.FC<{ content: any; resumeId?: string }>
> = {
  "Template One": TemplateOne,
  "Template Two": TemplateTwo,
};
