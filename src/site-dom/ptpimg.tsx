import { render } from 'preact';
import Notification from '../components/Notification';

if (location.host === 'ptpimg.me') {
  const ptpImgApiKey = GM_getValue('easy-seed.ptp-img-api-key') || '';
  if (!ptpImgApiKey) {
    const div = document.createElement('div');
    render(<div class="ptp-api-key-btn">
      <button class="btn btn-info" onClick={() => {
        const apiKey = $('#api_key').val();
        GM_setValue('easy-seed.ptp-img-api-key', apiKey);
        Notification.open({
          message: 'Success!',
          description: 'Saved to EasyUpload.',
        });
      }}>
        <i class="glyphicon glyphicon-floppy-saved" />
        <span>Save ApiKey</span>
      </button>
    </div>, div);
    document.querySelector('#form_file_upload').appendChild(div);
  }
}
