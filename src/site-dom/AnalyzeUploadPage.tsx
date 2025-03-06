/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast, Toaster } from 'sonner';
import { render } from 'preact';
import YAML from 'yaml';
import { $t } from '../common';
import { CURRENT_SITE_INFO } from '../const';
const AnalyzeUploadPage = () => {
  const analyzeForm = () => {
    const baseUrl = window.location.origin;
    const host = window.location.host;

    const baseConfig = {
      url: baseUrl,
      host,
      uploadPath: window.location.pathname,
    };
    const formElements = document.querySelectorAll('input, select, textarea');
    const formConfig: any = {};

    formElements.forEach(element => {
      const name = element.getAttribute('name');
      if (!name) return;

      if (element instanceof HTMLSelectElement) {
        const options = Array.from(element.options).map(opt => ({
          value: opt.value,
          text: opt.text,
        }));

        formConfig[name] = {
          selector: `select[name="${name}"]`,
          options,
        };
      } else if (element instanceof HTMLInputElement) {
        formConfig[name] = {
          selector: `input[name="${name}"]`,
          type: element.type,
        };
      } else if (element instanceof HTMLTextAreaElement) {
        formConfig[name] = {
          selector: `textarea[name="${name}"]`,
        };
      }
    });
    navigator.clipboard.writeText(YAML.stringify({ ...formConfig, ...baseConfig })).then(() => {
      toast.success($t('配置已复制到剪贴板,请黏贴到创建的Github Issue中'));
    });
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <button
        onClick={analyzeForm}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {`[EASY-UPLOAD]${$t('获取页面配置')}`}
      </button>
    </>
  );
};

if (location.pathname.includes('upload') && !CURRENT_SITE_INFO.asTarget) {
  const div = document.createElement('div');
  render(<AnalyzeUploadPage />, div);
  document.body.appendChild(div);
}
