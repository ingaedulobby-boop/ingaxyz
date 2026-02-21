// MDX Parsing Utilities for Knowledge Base and Concept Content Parsing

import { promises as fs } from 'fs';
import matter from 'gray-matter';

/**
 * Parses MDX content and returns the content and frontmatter.
 * @param {string} filePath - The path of the MDX file to parse.
 * @returns {Promise<{content: string, frontmatter: object}>} - Parsed content and frontmatter.
 */
export async function parseMdx(filePath) {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    return { frontmatter: data, content };
}

/**
 * Example function to load MDX files from a directory
 * @param {string} dirPath - The directory path containing MDX files.
 * @returns {Promise<object[]>} - An array of parsed MDX contents.
 */
export async function loadMdxFiles(dirPath) {
    const files = await fs.readdir(dirPath);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    const parsedMdxContents = await Promise.all(mdxFiles.map(file => parseMdx(`${dirPath}/${file}`)));
    return parsedMdxContents;
}