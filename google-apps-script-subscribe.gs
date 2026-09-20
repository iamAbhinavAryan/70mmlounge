function doPost(e) {
  try {
    const params = e.parameter || {};
    const name = (params.name || '').trim();
    const phone = (params.phone || '').trim();
    const email = (params.email || '').trim();

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = 'Subscribers';
    let sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email']);
    }

    sheet.appendRow([
      new Date(),
      name,
      phone,
      email
    ]);

    const thankYouMessage = [
      'Thank you for subscribing to 70MM Lounge.',
      'You can now use your 15% discount on your next visit.',
      'We look forward to welcoming you.'
    ].join('\n');

    const adminMessage = [
      'New subscription received at 70MM Lounge.',
      'Name: ' + (name || 'Not provided'),
      'Phone: ' + (phone || 'Not provided'),
      'Email: ' + (email || 'Not provided'),
      'Time: ' + new Date().toString()
    ].join('\n');

    if (email) {
      GmailApp.sendEmail(
        email,
        'Thank you for subscribing at 70MM Lounge',
        thankYouMessage
      );
    }

    const adminEmail = getAdminEmail();
    if (adminEmail) {
      GmailApp.sendEmail(adminEmail, 'New 70MM Lounge subscriber', adminMessage);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getAdminEmail() {
  return PropertiesService.getScriptProperties().getProperty('ADMIN_EMAIL') || 'iamabhinavaryan@gmail.com';
}

// SMS is paid and disabled for now.
// If you want to enable SMS later, add Twilio config and call the SMS function here.

function doGet() {
  return ContentService
    .createTextOutput('Subscribe endpoint is active')
    .setMimeType(ContentService.MimeType.TEXT);
}
