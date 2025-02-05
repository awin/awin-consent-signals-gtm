const log = require('logToConsole');
const setInWindow = require('setInWindow');
const isConsentGranted = require('isConsentGranted');
const addConsentListener = require('addConsentListener');
const copyFromWindow = require('copyFromWindow');
const callInWindow = require('callInWindow');
const isUsingGoogleConsentModeParams = data.isUsingGoogleConsentModeParams;
const consentModeParameter = data.consentModeParameter;
const consentStatusInputVariable = data.consentStatusInputVariable;
const awinObjectAfterConsent = copyFromWindow('AWIN');
const version = '1.0.0';

var AWIN = awinObjectAfterConsent ||  {};
AWIN.Tracking = AWIN.Tracking || {};
AWIN.Tracking.AdvertiserConsent = false;

//if AWIN object is not defined on initialization, then write it on window
if (!AWIN.Tracking.Consent) {
  setInWindow('AWIN', AWIN, true);
}

if (isUsingGoogleConsentModeParams) {
  //set consent status on initialization
  setInWindow('AWIN.Tracking.AdvertiserConsent', isConsentGranted(consentModeParameter), true);
  callInWindow('AWIN.Tracking.Consent.setAdvertiserConsentStatus', isConsentGranted(consentModeParameter));
  
  //add listener for consent changes
  addConsentListener(consentModeParameter, (consentType, granted) => {    
    //set consent status when consent is updated
    setInWindow('AWIN.Tracking.AdvertiserConsent', isConsentGranted(consentModeParameter), true);
    callInWindow('AWIN.Tracking.Consent.setAdvertiserConsentStatus', isConsentGranted(consentModeParameter)); 
  });
} else {
  //if consent value is invalid, then consent status is set to true 
  const consentStatus = evaluateConsent(consentStatusInputVariable);
  setInWindow('AWIN.Tracking.AdvertiserConsent', consentStatus, true);
  callInWindow('AWIN.Tracking.Consent.setAdvertiserConsentStatus', consentStatus);
}

function evaluateConsent(consent) {
  if (typeof consent === 'string') {
  	if (consent.toLowerCase() === 'true' || consent === '1') {
		return true;
	} else if (consent.toLowerCase() === 'false' || consent === '0') {
		return false;
	}
  } else if (consent == true || consent == false) {
	return consent == true;
  }
  //if consent input is not valid, then return true
  log('WARNING: AWIN Consent Signals defaulted to consent status "true" due to incorrect consent value provided. Allowed values: "true"/"false", true/false, "1"/"0", 1/0, prodvided value: ',  consentStatusInputVariable);
  return true;
}

// Call data.gtmOnSuccess when the tag is finished.
data.gtmOnSuccess();
