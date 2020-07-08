const $terms_all =  $("label[for='all']");
const $essential_label = $("label[for='essential']");
const $ad_label = $("label[for='receive_optional']");
const all_check = $("#all");
const essential_check = $("#essential");
const ad_check = $("#receive_optional");

const check_all = function() {
  if (all_check.checked) {
    essential_check.checked = true;
    ad_check.checked = true;
  } else {
    essential_check.checked = false;
    ad_check.checked = false;
  }
}

const check_essential = function() {
  if (essential_check.checked && ad_check.checked) {
    all_check.checked = true;
  } else if (!essential_check.checked) {
    all_check.checked = false;
  }
}

const check_ad = function() {
  if (ad_check.checked && essential_check.checked) {
    all_check.checked = true;
  } else if (!ad_check.checked) {
    all_check.checked = false;
  }
}