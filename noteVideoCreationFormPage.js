// too many things going on in this file. Should break it up and import
// TODO add submit button
// SECTION ELEMS {{{
const titleSection     = document.getElementById("titleSection");
const urlSection       = document.getElementById("urlSection");
const timeStampSection = document.getElementById("timeStampSection");
const notesSection     = document.getElementById("notesSection");
const tagSection       = document.getElementById("tagSection");
const categorySection  = document.getElementById("categorySection");
const termDefsSection  = document.getElementById("termDefsSection");
//}}}

// TEMPLATE CLONES' PARENT ELEMS {{{
const tagSection__select   = document.getElementById("tagSection__select");
const tagSection__tagList  = document.getElementById("tagSection__tagList");

const timeStampSection__tsList     = document.getElementById("timeStampSection__tsList");
const termDefsSection__termDefList =  document.getElementById("termDefsSection__termDefList");
//}}}

// TEMPLATE ELEMS {{{
const twoInputTemplate = document.getElementById("twoInputComponentTemplate");
const tagTemplate         = document.getElementById("tagTemplate");
//}}}

// BUTTON ELEMS {{{
const addNewTimeStampBtn = document.getElementById("addNewTimeStampBtn");
const addNewTagBtn       = document.getElementById("addNewTagBtn");      //not implemented
const addNewTermDefBtn   = document.getElementById("addNewTermDefBtn");
const addNewCategoryBtn  = document.getElementById("addNewCategoryBtn"); //not implemented
//}}}

// DYNAMICALLY ADDED ELEM ID PREFIXES {{{
const TAG_SELECT_OPTION_PREFIX    = "tagOpt_";
const TAG_LIST_ELEMENT_ID_PREFIX  = "tagLi_";

const TIMESTAMP_LIST_ELEMENT_ID_PREFIX = "tsLi_";
const TERMDEF_LIST_ELEMENT_ID_PREFIX   = "tdLi_";
//}}}

//TODO use dotenv for url to post form to
const SUBMISSION_URL = "http://localhost:9999"

/*
{
0 componentIdPrefix
1 InputChildClass
2 InputChildValidationPattern
3 textAreaChildClass
4 textAreaChildValidationPattern
}
*/
const GENERIC_TEXT_AREA_VALIDATION_PATTERN = "^[-\\w;\\{\\}+=\\n\\s_,\\.'()\\[\\]:]{2,255}$"
const TIMESTAMP_INPUT_COMPONENT_CONFIG = ["tsLi_",
                                          "twoInputElement__smallInputField",
                                          "([0-2][0-4][\\.:])?[0-5][0-9][\\.:][0-5][0-9]",
                                          "twoInputElement__bigInputField",
                                          GENERIC_TEXT_AREA_VALIDATION_PATTERN
                                          ];
const TERMDEF_INPUT_COMPONENT_CONFIG = ["tdLi_",
                                        "twoInputElement__smallInputField",
                                        "[\\w\\s_-]{2,20}",
                                        "twoInputElement__bigInputField",
                                        GENERIC_TEXT_AREA_VALIDATION_PATTERN
                                        ];
// ADD EVENT LISTENERS {{{
tagSection.addEventListener("click", createNewTag);
tagSection__select.addEventListener("click", addTagFromSelectOption);
tagSection__tagList.addEventListener("click", removeTagFromSelectOption);

addNewTimeStampBtn.addEventListener("click", addTSInputFromTemplate);
timeStampSection__tsList.addEventListener("click", timeStampSection__tsList_CLickListener)
timeStampSection__tsList.addEventListener("keypress", disableTwoInputElement__SmallInputFieldSubmitionOnENTER)

addNewTermDefBtn.addEventListener("click", addTermDefFromTemplate);
termDefsSection__termDefList.addEventListener("click",termDefsSection__termDefList_CLickListener);
termDefsSection__termDefList.addEventListener("keypress", disableTwoInputElement__SmallInputFieldSubmitionOnENTER)
//}}}

// TAG SECTION FNS{{{
//create tag that does not exist in DB
function createNewTag(){
  //TODO implement createNewTag
  //send to backend for validation [-_'a-zA-Z0-9]{2,m}
  //if validated then add to tag list and add diasbled option to select
}

function createTagElement(tagName){

  let tagFragmentContent = createTemplateContentClone(tagTemplate);
  
  tagFragmentContent.id = TAG_LIST_ELEMENT_ID_PREFIX.concat(tagName);

  let tagFragmentContentH6 = tagFragmentContent.querySelector(".tagItem__name");
  tagFragmentContentH6.innerText = tagName;
  
  return tagFragmentContent;
}

/**
*Adds a tagElement to tagSection__tagList and disables the 
*  corresponding HTMLOptionElement
*/
function addTagFromSelectOption(ev){

  let tagName = ev.target.value;
  if (ev.target.value === ""){
    return;
  }
  
  tagSection__tagList.appendChild(
    createTagElement(tagName)
  );

  //in Chrome event targets select elem while in Firefox it targets the desired option
  if(navigator.userAgent.indexOf('Chrome') > 0){

    let optToDisableIdx = ev.target.selectedIndex;
    let optToDisable = ev.target.item(optToDisableIdx);

    optToDisable.setAttribute("disabled", "disabled");
    ev.target.value = "";

  }else if(navigator.userAgent.indexOf('Firefox') > 0){

    ev.target.setAttribute("disabled", "disabled");
    ev.target.parentElement.value = "";
  }
}

/**
*Removes a tagElement from tagSection__tagList and enables the 
*  corresponding HTMLOptionElement in tagSection__select
*/
function removeTagFromSelectOption(ev){

    if(ev.target.classList.contains("tagItem__rmBtn")){
      console.log(ev);
        ev.preventDefault();

      //Could add data-name attr to the button upon creation to 
      //  avoid splitting another elem's id
      let tagName = ev.target.parentElement.id.split("_")[1]; 
      let optToEnableId = TAG_SELECT_OPTION_PREFIX.concat(tagName); 
      let liToRemoveId  = TAG_LIST_ELEMENT_ID_PREFIX.concat(tagName);
      
      let optToEnable = document.getElementById(optToEnableId);
      let liToRemove  = document.getElementById(liToRemoveId);

      optToEnable.removeAttribute("disabled");

      tagSection__tagList.removeChild(liToRemove);
    }
}
//}}}
// TIMESTAMP SECTION FNS {{{
function addTSInputFromTemplate(){

  let newComponent = twoInputComponentFactory(TIMESTAMP_INPUT_COMPONENT_CONFIG)

  timeStampSection__tsList.appendChild(newComponent);

  newComponent.querySelector('.twoInputElement__smallInputField').focus()
}

// functionality implemented in handleTwoInputComponentBtnClicks
function editTSInputFromList(){}

//maybe add guarde-fou like "are you sure" pop up
function removeTSInputFromList(elemToRmId){
   timeStampSection__tsList.removeChild(document.getElementById(elemToRmId)); 
}

function timeStampSection__tsList_CLickListener(ev){
  
  if(ev.target.classList.contains("rmBtn")){
    removeTSInputFromList(ev.target.parentElement.parentElement.id);
  }else{
    handleTwoInputComponentBtnClicks(ev);
  }

}
//}}}
// TERMDEF SECTION FNS {{{
function addTermDefFromTemplate(){

  let newComponent = twoInputComponentFactory(TERMDEF_INPUT_COMPONENT_CONFIG)

  termDefsSection__termDefList.appendChild(newComponent);

  newComponent.querySelector('.twoInputElement__smallInputField').focus()
}

// functionality implemented in handleTwoInputComponentBtnClicks
function editTSInputFromList(){}

function removeTermDefInputFromTermDefList(elemToRmId){
  termDefsSection__termDefList.removeChild(document.getElementById(elemToRmId)); 
}

function termDefsSection__termDefList_CLickListener(ev){
  
  if(ev.target.classList.contains("rmBtn")){
    
    removeTermDefInputFromTermDefList(ev.target.parentElement.parentElement.id);

  }else{
    handleTwoInputComponentBtnClicks(ev);
  }

}
//}}}
// FORM SUBMISSION {{{
function submitForm(){

  let formdata = new FormData();
  let sections = ["Title", "Url", "TimeStamps","TermDefs","Notes","Description","Tags"];
  let collectionErrorMessages = [];//maybe use aggregateError

  sections.forEach(section =>{
    try{
      //console.log("=Collecting: "+ section)
      var input = window["collect"+section].call();
      formdata.append(section, input);
    }catch(e){
      collectionErrorMessages.push("  - "+e.message);
    }

  })

  if(collectionErrorMessages.length > 0 ){
    alert("Submition failed:\n" + collectionErrorMessages.join("\n"));
    return;
  }

  var request = new XMLHttpRequest();
  request.open("POST", SUBMISSION_URL);
  request.send(formdata);

  return formdata;
}

function collectTitle(){
  return collectFormSection__inputElem(titleSection, "TITLE");
}

function collectUrl(){
  return collectFormSection__inputElem(urlSection, "URL");
}

function collectDescription(){
  try{
    TextAreaIsValid(descriptionSection.children[1]);
  }catch(e){
    if( e instanceof ReferenceError){
      throw new Error("description textArea does not have a validation pattern");
    }else{
      throw e;
    }

  }
  return descriptionSection.children[1].value;
}

function collectTimeStamps(){
    return collectTwoInputComponentContents(timeStampSection__tsList, "timestamps");
}

function collectTags(){
  // no need to validate input since it comes from select options

  let ret = [];
  //going through tagList rather than select elem since non-selected options might also be disabled
  for(tag of tagSection__tagList.children){
    ret.push(tag.children[0].innerText);
  }
  return JSON.stringify(
    {"tags": ret}
  );
}

function collectNotes(){
  try{
    TextAreaIsValid(notesSection.children[1]);
  }catch(e){
    if( e instanceof ReferenceError){
      throw new Error("notes textArea does not have a vaidation pattern");
    }else{
      throw e;
    }
  }
  return notesSection.children[1].value;
}

function collectTermDefs(){
    return collectTwoInputComponentContents(termDefsSection__termDefList, "term definitions");
}
// }}}


// TWOINPUTCOMPONENT FNS {{{

function twoInputComponentFactory(twoInputComponentConfigObj){
  
  let newElem = createTemplateContentClone(twoInputTemplate);
  let idSuffix = RandomInt();
  newElem.id = twoInputComponentConfigObj[0] //componentIdPrefix
    .concat(idSuffix);

  newElem.children[0].classList.add(
    twoInputComponentConfigObj[1] //InputChildClass
  );
  newElem.children[0].setAttribute( "pattern",
    twoInputComponentConfigObj[2] //InputChildValidationPattern
  );

  newElem.children[1].classList.add(
    twoInputComponentConfigObj[3] //textAreaChildClass
  );
  newElem.children[1].setAttribute( "data-pattern",
    twoInputComponentConfigObj[4] //textAreaChildValidationPattern
  );

  return newElem;
}

/**
* Handles events from '.twoInputElement .inputComponentBtn' elements
* @function handleTwoInputComponentBtnClicks
* @param {Event} ev
*/
function handleTwoInputComponentBtnClicks(ev){

  component = ev.target.parentElement.parentElement;
  txtInput  = component.querySelector('input');
  txtArea   = component.querySelector('textArea');

  if(ev.target.classList.contains("stageBtn")){
    // could do this on keypress
    // could parse value for forbidden characters for feedback
    inputsAreValid = validateTwoInputComponentInputs(txtInput, txtArea)

    if(!inputsAreValid){
      return;
    }
    component.classList.toggle("twoInputElement--active", false);
    for(var child of component.children){
      // no need to check nodeName as buttons are grandchildren and won't be disabled
      child.setAttribute("disabled", true);
    }
    // if text area has been resized manually a style attr is added to the 
    //mark up, which overrides the block-size in css
    txtArea.removeAttribute("style");

  }else if(ev.target.classList.contains("editBtn")){

    component.classList.toggle("twoInputElement--active", true);
    for(var child of component.children){
      child.removeAttribute("disabled");
    }
    txtArea.removeAttribute("style");

  }
}

function disableTwoInputElement__SmallInputFieldSubmitionOnENTER(ev){
  //add this to tSSection and tDSection as eventListeners
  if(ev.target.classList.contains('twoInputElement__smallInputField') 
    && (ev.code === "Enter" || ev.code === "NumpadEnter")){
    ev.preventDefault();
  }
}

function validateTwoInputComponentInputs(txtInput, txtArea){
  
  txtAreaIsValid = TextAreaIsValid(txtArea)

  if(txtAreaIsValid){
    txtArea.classList.toggle('invalidUserInput', false);
  }else{
    txtArea.classList.toggle('invalidUserInput', true);
  }
  
  txtInputIsValid = txtInput.value.length !== 0 
    && !txtInput.validity.patternMismatch;

  if(txtInputIsValid){
    txtInput.classList.toggle('invalidUserInput', false);
  }else{
    txtInput.classList.toggle('invalidUserInput', true);
  }

  return txtAreaIsValid && txtInputIsValid;
}

/**
* @param {object} componentListElem - the UL that contains the twoInputComponents
* @param {string} objectkind - the name of the section and object type
*/
function collectTwoInputComponentContents(componentListElem, objectkind){

  let ret = {}
  for(var child of componentListElem.children){

    if(child.classList.contains('twoInputElement--active')){
      alert("please stage all notes in the " +
        objectkind.toUpperCase() +" section.");
      throw new Error("ERR_UNSTAGED");
    }

    if(ret[child.children[0].value] != null ){
      alert("Multiple " + objectkind.toUpperCase() + " with key: " + child.children[0].value);
      throw new Error("ERR_DUPLICATE_KEYS");
    }
    ret[child.children[0].value] = child.children[1].value;
  }
  return JSON.stringify(ret);
}
// }}}

// MISC HELPERS {{{
function createTemplateContentClone(template){
  if (template.nodeName !== "TEMPLATE"){
    throw new TypeError("Expected a Template type");
  }
  return template.content.firstElementChild.cloneNode(true);
}

function RandomInt() {
    return Math.floor(Math.random() * 100000);
}

function TextAreaIsValid(elem){
  if(elem.nodeName != "TEXTAREA"){ throw new TypeError("TextAreaIsValid expects TEXTAREA")}
  if(elem.dataset.pattern == null){throw new ReferenceError("Can't validate TEXTAREA with no dataset.pattern")}
  return RegExp(elem.dataset.pattern).test(elem.value);
}


function collectFormSection__inputElem(sectionElem, sectionName){
  txtInput = sectionElem.children[1];
  if(!txtInput.validity.valid){
    throw new Error(sectionName+" invalid");
  }
  return txtInput.value;
}
// }}}

function testInp(){

  titleSection.children[1].value = "fascinating note";
  urlSection.children[1].value = "http://fascinating_note.com";

  notesSection.querySelector('textArea').value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
  descriptionSection.children[1].value = "this a is a test description. very interesting indeed."

  tagSection__tagList.appendChild(
    createTagElement("tagName")
  );

  tagSection__tagList.appendChild(
    createTagElement("AnothertagName")
  );

  let newComponent1 = twoInputComponentFactory(TIMESTAMP_INPUT_COMPONENT_CONFIG);
  newComponent1.children[0].value = "01.03";
  newComponent1.children[1].value = "Lorem ipsum dolor sit amet";
  newComponent1.classList.toggle("twoInputElement--active", false);
  timeStampSection__tsList.appendChild(newComponent1);

  let newComponent2 = twoInputComponentFactory(TIMESTAMP_INPUT_COMPONENT_CONFIG);
  newComponent2.children[0].value = "05.03";
  newComponent2.children[1].value = "Lorem ipsum dolor sit amet";
  newComponent2.classList.toggle("twoInputElement--active", false);
  timeStampSection__tsList.appendChild(newComponent1);

  newComponent2.classList.toggle("twoInputElement--active", false);
  timeStampSection__tsList.appendChild(newComponent2);

  let newComponent3 = twoInputComponentFactory(TERMDEF_INPUT_COMPONENT_CONFIG);
  newComponent3.children[0].value = "term1";
  newComponent3.children[1].value = "Lorem ipsum dolor sit amet";
  newComponent3.classList.toggle("twoInputElement--active", false);
  termDefsSection__termDefList.appendChild(newComponent3);

  let newComponent4 = twoInputComponentFactory(TERMDEF_INPUT_COMPONENT_CONFIG);
  newComponent4.children[0].value = "term2";
  newComponent4.children[1].value = "Lorem ipsum dolor sit amet";
  newComponent4.classList.toggle("twoInputElement--active", false);
  termDefsSection__termDefList.appendChild(newComponent4);
}

testInp();
var f = submitForm();
var it = () => {for (var pair of f){console.log(pair[0]+ ', '+ pair[1])}}
it()
/*
maybe todos
- create :hover rule for buttons, rule that changes color toggled on on clipdown and off on clickup (for feedback)
*/
