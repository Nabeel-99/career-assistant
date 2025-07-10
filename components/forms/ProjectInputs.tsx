import React from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type ProjectInputsProps = {
  projectFields: any[];
  form: any;
  removeProject: any;
  appendProject: any;
};
const ProjectInputs = ({
  projectFields,
  form,
  removeProject,
  appendProject,
}: ProjectInputsProps) => {
  return projectFields.map((field, index) => (
    <div key={field.id} className="grid  gap-4">
      <FormField
        control={form.control}
        name={`projects.${index}.title`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input type="text" placeholder="Enter project title" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`projects.${index}.description`}
        render={({ field }) => (
          <FormItem className="">
            <FormControl>
              <Textarea placeholder="Enter description" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`projects.${index}.stacks`}
        render={({ field }) => (
          <FormItem className="">
            <FormControl>
              <Textarea
                placeholder="Enter Stacks e.g React, Next.js, Tailwind CSS (optional)"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`projects.${index}.link`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input type="text" placeholder="Enter project link " {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <div className="flex items-center gap-2 justify-start">
        <Button
          className={cn({ hidden: index === 0 })}
          type="button"
          onClick={() => removeProject(index)}
        >
          Remove
        </Button>
        <Button
          type="button"
          onClick={() =>
            appendProject({
              title: "",
              description: "",
              stacks: "",
              link: "",
            })
          }
        >
          Add
        </Button>
      </div>
    </div>
  ));
};

export default ProjectInputs;
