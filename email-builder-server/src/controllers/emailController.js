import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';
import Template from '../models/template.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getEmailLayout = async (req, res) => {
  try {
    const layoutPath = path.join(__dirname, '../templates/layout.html');
    const layout = await fs.readFile(layoutPath, 'utf-8');
    res.send(layout);
  } catch (error) {
    res.status(500).json({ message: 'Error reading layout file', error: error.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }
    // Return the URL path to the uploaded image
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
};

export const uploadEmailConfig = async (req, res) => {
  try {
    const { title, content, footer, imageUrl } = req.body;
    const template = new Template({
      title,
      content,
      footer,
      imageUrl
    });
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: 'Error saving template', error: error.message });
  }
};

export const renderAndDownloadTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const layoutPath = path.join(__dirname, '../templates/layout.html');
    const layoutSource = await fs.readFile(layoutPath, 'utf-8');
    
    // Compile the template with Handlebars
    const compiledTemplate = Handlebars.compile(layoutSource);
    const html = compiledTemplate({
      title: template.title,
      content: template.content,
      footer: template.footer,
      imageUrl: template.imageUrl
    });

    // Set headers for file download
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', `attachment; filename="email-template-${template._id}.html"`);
    res.send(html);
  } catch (error) {
    res.status(500).json({ message: 'Error rendering template', error: error.message });
  }
};