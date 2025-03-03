import { render } from 'preact';
import { toast } from 'sonner';
import $ from 'jquery';

if (location.host === 'ptpimg.me') {
  const ptpImgApiKey = GM_getValue('easy-seed.ptp-img-api-key') || '';
  if (!ptpImgApiKey) {
    const div = document.createElement('div');
    render(<div class="ptp-api-key-btn">
      <button class="btn btn-info" onClick={() => {
        const apiKey = $('#api_key').val();
        GM_setValue('easy-seed.ptp-img-api-key', apiKey);
        toast.success('Success! Saved to EasyUpload.');
      }}>
        <i class="glyphicon glyphicon-floppy-saved" />
        <span>Save ApiKey</span>
      </button>
    </div>, div);
    document.querySelector('.well')?.appendChild(div);
  }
}
