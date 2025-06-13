import { render } from 'preact';
import { toast, Toaster } from 'sonner';
import $ from 'jquery';

if (location.host === 'ptpimg.me') {
  const ptpImgApiKey = GM_getValue<string>('easy-upload.ptp-img-api-key', '');
  if (!ptpImgApiKey) {
    const div = document.createElement('div');
    render(
      <div class="ptp-api-key-btn">
        <Toaster position="top-right" richColors />
        <button
          class="btn btn-info"
          onClick={() => {
            const apiKey = $('#api_key').val();
            GM_setValue('easy-upload.ptp-img-api-key', apiKey);
            toast.success('Success! Saved to EasyUpload.');
          }}
        >
          <i class="glyphicon glyphicon-floppy-saved" />
          <span>Save ApiKey</span>
        </button>
      </div>,
      div,
    );
    document.querySelector('.well')?.appendChild(div);
  }
}
