import Handlebars from 'handlebars';

export const compileTemplate = (template, data) => {
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate(data);
};