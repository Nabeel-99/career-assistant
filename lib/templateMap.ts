import TemplateOne from "@/components/cvtemplates/TemplateOne";
import TemplateTwo from "@/components/cvtemplates/TemplateTwo";
// 10 templates
export const templateMap: Record<
  string,
  React.FC<{ content: any; resumeId?: string }>
> = {
  "Template One": TemplateOne,
  "Template Two": TemplateTwo,
  "Template Three": TemplateOne,
  "Template Four": TemplateOne,
  "Template Five": TemplateOne,
  "Template Six": TemplateOne,
  "Template Seven": TemplateOne,
  "Template Eight": TemplateOne,
  "Template Nine": TemplateOne,
  "Template Ten": TemplateOne,
};
