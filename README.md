# awin-consent-signals-gtm
This Google Tag Manager template provides an out-of-the-box solution for implementing [Awin Consent Signals](https://wiki.awin.com/index.php/Consent_Frameworks_for_Advertisers) on websites that support Google Consent Mode. For sites that do not use Google Consent Mode, the tag can be used with a custom variable.

When configured correctly, the tag will ensure that the Awin cookies are handled according to the users' consent preference.

The template makes use of [Google's JavaScript Sandbox APIs](https://developers.google.com/tag-platform/tag-manager/templates/api), using consent management functions such as [addConsentListener](https://developers.google.com/tag-platform/tag-manager/templates/api#addconsentlistener) and [isConsentGranted](https://developers.google.com/tag-platform/tag-manager/templates/api#isconsentgranted).

NOTES: 
* a correct consent management implementation with this tag also requires changes to the Awin Conversion Tag (speak to Awin Tech Support if unsure).
* this tag only handles the client-side cookies. If you have a S2S implementation, then that should be handled separately.

# Configurations
The template can be configured to make use of the Google Consent Mode parameters, or to use custom variable that stores the user cosent status.

## Configuration with Google Consent Mode
After the template was imported, click on the resulting tag and tick the “Use Google Consent Mode Parameters” option, then select the Consent Mode parameter to which the Awin cookies have been categorised.  
![image](https://github.com/user-attachments/assets/aa28bce8-31b9-4689-be31-2cbfcabfadf5)

### Triggering
Use an "Initialization" trigger, see the "Triggering Logic" section below for more information.

## Configuration with custom variable
To enable this, deselect the “Use Google Consent Mode Parameters”, and you will get the option to map a variable to the plugin. The tag expects the one of the following values "true"/"false", "1"/"0", 1/0, or true/false.
![image](https://github.com/user-attachments/assets/18bb4e65-b820-4993-a4e9-f6e0dd3ef96f)

### Triggering
For the "custom variable" version, the tag should usse an "Initialization" trigger AND a custom "cookie consent update" trigger, which should fire the tag every time the consent is updated. 
See the Triggering Logic section below for more information.

# Triggering Logic
As a rule of thumb, the CMP tag should fire before the Awin Consent Signals tag, and we want the Awin Consent Signals tag to fire before the other Awin tags. 
![image](https://github.com/user-attachments/assets/211b33ff-1d4d-4525-8e17-9beb24957597)

Google has introduced some very useful consent-related triggers, which you can see the following page [Page view triggers
](https://support.google.com/tagmanager/answer/7679319?sjid=14804513256528510308-EU).

To ensure the correct firing sequence, use the following trigger types, in the specified order:
1.	Consent Initialization trigger for their CMP tag
2.	Initialization for the Awin Consent Signals
3.	Page View for Awin Journey / Conversion Tag

# Disclaimer

If you're not making use of the consent parameters then Awin assumes you've obtained cookie consent from the website visitor as per the ‘Advertiser Agreement’ for any traffic sent to Awin.

If you indicate that Awin doesn't have consent from the website visitor, Awin doesn't set a cookie on your landing page and doesn’t read first-party or process third party cookies on the checkout page, with the only exception to when cookie are considered as strictly necessary as for cashback and loyalty activities.

If any value besides `true`/`false` and `1`/`0` are passed, they will be treated as if no value was specified.

Consent for 3rd party MasterTag plugins should be handled separately. If you are using any 3rd party MasterTag plugins, then please reach out to the Technical Support team at Awin.
