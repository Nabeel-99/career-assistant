"use client";

import React from "react";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ImSpinner9 } from "react-icons/im";
import { Skeleton } from "../ui/skeleton";
import { useFieldArray, useForm } from "react-hook-form";
import { resumeSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

const CVForm = () => {
  const form = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      image: "",
      fullname: "",
      email: "",
      phone: "",
      location: "",
      title: "",
      summary: "",
      links: {
        linkedin: "",
        github: "",
        portfolio: "",
      },
      education: [
        {
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
          location: "",
        },
      ],
      experience: [
        {
          company: "",
          title: "",
          startDate: "",
          endDate: "",
          location: "",
          description: [""],
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          stacks: "",
          link: "",
        },
      ],
      skills: [],
      languages: [],
      awards: [],
    },
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: "experience",
  });
  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your location"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormLabel className="">Links</FormLabel>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="links.github"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your Github URL"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="links.linkedin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your Linkedin URL"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="links.portfolio"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your Portfolio URL"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <FormLabel>Education</FormLabel>
        {educationFields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`education.${index}.school`}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your school name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`education.${index}.degree`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your degree"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`education.${index}.location`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter school location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`education.${index}.startDate`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Enter your start date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`education.${index}.endDate`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Enter your end date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2 justify-start">
              <Button
                className={cn({ hidden: index === 0 })}
                type="button"
                onClick={() => removeEducation(index)}
              >
                Remove
              </Button>
              <Button
                type="button"
                onClick={() =>
                  appendEducation({
                    school: "",
                    degree: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                  })
                }
              >
                Add
              </Button>
            </div>
          </div>
        ))}
        <FormLabel>Experience</FormLabel>
        {experienceFields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`experience.${index}.company`}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter company name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`experience.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter title e.g Software Engineer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`experience.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`experience.${index}.location`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter company location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`experience.${index}.startDate`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Enter your start date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`experience.${index}.endDate`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Enter your end date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2 justify-start">
              <Button
                className={cn({ hidden: index === 0 })}
                type="button"
                onClick={() => removeEducation(index)}
              >
                Remove
              </Button>
              <Button
                type="button"
                onClick={() =>
                  appendEducation({
                    school: "",
                    degree: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                  })
                }
              >
                Add
              </Button>
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-3">
          <Button>Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default CVForm;
