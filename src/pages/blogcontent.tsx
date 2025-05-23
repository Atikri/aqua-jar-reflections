import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked'; // 假设你使用 marked 来解析 markdown

const BlogContent = () => {
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const { markdownFile } = useParams<{ markdownFile?: string }>();

  useEffect(() => {
    if (markdownFile) {
      const fetchMarkdownFile = async () => {
        const path = markdownFile.replace(/^\//, '');
        const response = await fetch(`/markdown/${path}`);

        if (!response.ok) {
          console.error('Failed to fetch markdown file', response.status);
          setMarkdownContent(null);
          return;
        }

        const text = await response.text();
        setMarkdownContent(marked(text)); // 使用 marked 解析 markdown
      };

      fetchMarkdownFile();
    }

    return () => {
      setMarkdownContent(null);
    };
  }, [markdownFile]);

  return (
    <div>
      {markdownContent ? (
        <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogContent;
