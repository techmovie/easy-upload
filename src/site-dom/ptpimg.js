import { showNotice } from '../common';
if (location.host === 'ptpimg.me') {
  const ptpImgApiKey = GM_getValue('easy-seed.ptp-img-api-key') || '';
  if (!ptpImgApiKey) {
    $('#form_file_upload').after(`
    <div class="ptp-api-key-btn">
    <button class="btn btn-info">
    <i class="glyphicon glyphicon-floppy-saved"></i>
    <span>Save ApiKey</span>
    </button>
    </div>
    `);
    $('.ptp-api-key-btn button').click(() => {
      const apiKey = $('#api_key').val();
      GM_setValue('easy-seed.ptp-img-api-key', apiKey);
      showNotice({
        title: 'Success!',
        text: 'Saved to EasyUpload.',
      });
    });
  }
}
