/**
 * Auto Archive Chats v0.2.11 (beta) by @bumbleshoot
 *
 * See GitHub page for info & setup instructions:
 * https://github.com/bumbleshoot/auto-archive-chats
 */

const USER_ID = "";
const API_TOKEN = "";
const WEB_APP_URL = "";

const ARCHIVES = [
  {
    name: "",
    groupId: "", // leave blank for party
    folderId: ""
  },
  {
    name: "",
    groupId: "",
    folderId: ""
  } // repeat this as many times as you want!
];
 
/*************************************\
 *  DO NOT EDIT ANYTHING BELOW HERE  *
\*************************************/

const PARAMS = {
  "headers": {
    "x-api-user": USER_ID, 
    "x-api-key": API_TOKEN,
    "x-client": "35c3fb6f-fb98-4bc3-b57a-ac01137d0847-AutoArchiveChats"
  },
  "muteHttpExceptions": true
};
const GET_PARAMS = Object.assign({ "method": "get" }, PARAMS);
const POST_PARAMS = Object.assign({ "method": "post" }, PARAMS);
const DELETE_PARAMS = Object.assign({ "method": "delete" }, PARAMS);

const scriptProperties = PropertiesService.getScriptProperties();

function install() {

  // if settings are valid
  if (validateConstants()) {

    // delete triggers & webhooks
    deleteTriggers();
    deleteWebhooks();

    // get list of group IDs & rename files if names changed
    let groupIds = [];
    for (let archive of ARCHIVES) {
      groupIds.push(archive.groupId || getUser().party._id);
      let folder = DriveApp.getFolderById(archive.folderId);
      let files = folder.getFiles();
      while (files.hasNext()) {
        let file = files.next();
        if (file.getMimeType() == MimeType.GOOGLE_SHEETS && file.getName().match(/^[0-9]{4}/) !== null) {
          if (!archive.name) {
            let group = JSON.parse(fetch("https://habitica.com/api/v3/groups/" + (archive.groupId || "party"), GET_PARAMS)).data;
            archive.name = group.name;
            archive.chat = group.chat;
          }
          file.setName(file.getName().split(" ")[0] + " " + archive.name + " Archive");
        }
      }
    }

    // archive chats
    archiveChats(groupIds);

    // delete group ID script properties
    for (let scriptProperty of Object.entries(scriptProperties.getProperties())) {
      if (scriptProperty[0].match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/) !== null) {
        scriptProperties.deleteProperty(scriptProperty[0]);
      }
    }

    // create webhooks
    createWebhooks();

    console.log("Success!");
  }
}

function uninstall() {

  // delete triggers & webhooks
  deleteTriggers();
  deleteWebhooks();

  console.log("Done!");
}

function validateConstants() {

  let valid = true;

  if (typeof USER_ID !== "string" || USER_ID == "") {
    console.log("ERROR: USER_ID must equal your Habitica User ID.\n\neg. const USER_ID = \"abcd1234-ef56-ab78-cd90-efabcd123456\";\n\nYour Habitica User ID can be found at https://habitica.com/user/settings/api");
    valid = false;
  }

  if (typeof API_TOKEN !== "string" || API_TOKEN == "") {
    console.log("ERROR: API_TOKEN must equal your Habitica API Token.\n\neg. const API_TOKEN = \"abcd1234-ef56-ab78-cd90-efabcd123456\";\n\nYour Habitica API Token can be found at https://habitica.com/user/settings/api");
    valid = false;
  }

  if (valid) {
    try {
      getUser(true);
    } catch (e) {
      if (e.stack.includes("There is no account that uses those credentials")) {
        console.log("ERROR: Your USER_ID and/or API_TOKEN is incorrect. Both of these can be found at https://habitica.com/user/settings/api");
        valid = false;
      } else {
        throw e;
      }
    }
  }

  if (typeof WEB_APP_URL !== "string" || WEB_APP_URL == "") {
    console.log("ERROR: WEB_APP_URL must equal the web app url of this project's deployment.\n\neg. const WEB_APP_URL = \"https://script.google.com/macros/s/abc123def456ghi789jkl012abc345de/exec\";");
    valid = false;
  }

  if (typeof ARCHIVES === "undefined" || ARCHIVES.length === 0) {
    console.log("ERROR: ARCHIVES must equal a list of groups and their corresponding Google Drive folders (archives).\n\neg. const ARCHIVES = [\n      {\n        name: \"My Party\",\n        groupId: \"\",\n        folderId: \"1eK91rX_bt8KHirMhrTeWPVJGMKidR-3c\"\n      },\n      {\n        name: \"A Guild\",\n        groupId: \"5481ccf3-5d2d-48a9-a871-70a7380cee5a\",\n        folderId: \"1yh986km6v51MXzBsYSfGFqL4IM0xkJbB\"\n      }\n    ];");
    valid = false;
  } else {

    let archivesValid = true;
    for (let i=0; i<ARCHIVES.length; i++) {

      if (typeof ARCHIVES[i].groupId !== "string") {
        console.log("ERROR: Each groupId must equal the ID of a guild you want to archive chat messages for, or empty quotations if you want to archive chat messages for your party.\n\neg. groupId: \"5481ccf3-5d2d-48a9-a871-70a7380cee5a\";\n    groupId: \"\";\n\nThe guild ID can be found at the end of the URL (in your address bar) while you are viewing the guild in a web browser.");
        archivesValid = false;

      } else if (ARCHIVES[i].groupId !== "" && !getUser().guilds.includes(ARCHIVES[i].groupId)) {
        console.log("ERROR: You must be a member of each guild or party identified by groupId.");
        archivesValid = false;
      }

      try {
        DriveApp.getFolderById(ARCHIVES[i].folderId);
      } catch (e) {
        if (e.stack.includes("Unexpected error while getting the method or property getFolderById on object DriveApp")) {
          console.log("ERROR: Each folderId must be the ID of a Google Drive folder you have write access too. The ID \"" + ARCHIVES[i].folderId + "\" does not belong to any of your Google Drive folders.\n\neg. folderId: \"1eK91rX_bt8KHirMhrTeWPVJGMKidR-3c\";\n\nThe folder ID can be found at the end of the URL (in your address bar) while you are viewing the folder in a web browser.");
          archivesValid = false;
        } else {
          throw e;
        }
      }

      for (let j=i+1; j<ARCHIVES.length; j++) {

        if (ARCHIVES[i].groupId === ARCHIVES[j].groupId) {
          console.log("ERROR: Each groupId must be unique. You are attempting to archive the guild or party identified by \"" + ARCHIVES[i].groupId + "\" more than once.");
          archivesValid = false;
          break;
        }

        if (ARCHIVES[i].folderId === ARCHIVES[j].folderId) {
          console.log("ERROR: Each folderId must be unique. You are attempting to archive more than one chat to the Google Drive folder with ID \"" + ARCHIVES[i].folderId + "\".");
          archivesValid = false;
          break;
        }
      }

      if (!archivesValid) {
        valid = false;
        break;
      }
    }
  }

  if (!valid) {
    console.log("Please fix the above errors, create a new version of the deployment, and run the install function again. If you aren't sure how to do this, see \"Changing the Settings\" in the documentation for this script.");
  }

  return valid;
}

function deleteTriggers() {
  let triggers = ScriptApp.getProjectTriggers();
  if (triggers.length > 0) {

    console.log("Deleting triggers");

    for (let trigger of triggers) {
      ScriptApp.deleteTrigger(trigger);
    }
  }
}

function deleteWebhooks() {
  let webhooks = JSON.parse(fetch("https://habitica.com/api/v3/user/webhook", GET_PARAMS)).data;
  if (webhooks.length > 0) {

    console.log("Deleting webhooks");

    for (let webhook of webhooks) {
      if (webhook.url == WEB_APP_URL) {
        fetch("https://habitica.com/api/v3/user/webhook/" + webhook.id, DELETE_PARAMS);
      }
    }
  }
}

function createWebhooks() {

  let webhooks = [];

  // group chat received
  for (let archive of ARCHIVES) {
    webhooks.push({
      "type": "groupChatReceived",
      "options": {
        "groupId": archive.groupId || getUser().party._id
      }
    });
  }

  // create webhooks
  if (webhooks.length > 0) {

    console.log("Creating webhooks");

    for (let webhook of webhooks) {
      webhook = Object.assign({
        "url": WEB_APP_URL,
        "label": DriveApp.getFileById(ScriptApp.getScriptId()).getName()
      }, webhook);
      webhook = Object.assign({
        "contentType": "application/json",
        "payload": JSON.stringify(webhook)
      }, POST_PARAMS);
      fetch("https://habitica.com/api/v3/user/webhook", webhook);
    }
  }
}

/**
 * doPost(e)
 * 
 * This function is called by webhooks.
 */
let webhook;
function doPost(e) {
  try {

    webhook = true;

    // store group ID in script property
    scriptProperties.setProperty(JSON.parse(e.postData.contents).group.id, new Date().getTime());

    // create temporary trigger to archive chat
    let triggerNeeded = true;
    if (ScriptApp.getProjectTriggers().length > 0) {
      triggerNeeded = false;
    }
    if (triggerNeeded) {
      ScriptApp.newTrigger("processTrigger")
        .timeBased()
        .after(1)
        .create();
    }

  } catch (e) {
    if (!e.stack.includes("Address unavailable")) {
      MailApp.sendEmail(
        Session.getEffectiveUser().getEmail(),
        DriveApp.getFileById(ScriptApp.getScriptId()).getName() + " failed!",
        e.stack
      );
      console.error(e.stack);
      throw e;
    }
  }
}

/**
 * processTrigger()
 * 
 * Deletes temporary triggers, calls the archiveChats() 
 * function, and emails the user if any errors are thrown.
 */
let trigger;
function processTrigger() {
  try {

    trigger = true;

    // delete temporary triggers
    for (let trigger of ScriptApp.getProjectTriggers()) {
      ScriptApp.deleteTrigger(trigger);
    }

    // archive chats
    archiveChats();

  } catch (e) {
    MailApp.sendEmail(
      Session.getEffectiveUser().getEmail(),
      DriveApp.getFileById(ScriptApp.getScriptId()).getName() + " failed!",
      e.stack
    );
    console.error(e.stack);
    throw e;
  }
}

/**
 * archiveChats()
 * 
 * Prints chat messages from each of the groups in the ARCHIVE list 
 * to each of the Google Drive folders in the ARCHIVE list, 
 * respectively. Chat messages are split into sheets (tabs) by month, 
 * and spreadsheets by year.
 */
function archiveChats(groupIds) {
  try {

    // prevent multiple instances from running at once
    let lock = LockService.getScriptLock();
    if ((trigger && lock.tryLock(0)) || lock.tryLock(360000)) {

      // get group IDs from script properties if not passed to function
      if (typeof groupIds === "undefined") {
        groupIds = Object.entries(scriptProperties.getProperties())
          .filter(scriptProperty => scriptProperty[0].match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/) !== null);
        if (groupIds.length === 0) {
          return;
        } else {
          groupIds = groupIds
            .sort((a, b) => {
              if (a[1] < b[1]) {
                return -1;
              } else {
                return 1;
              }
            })
            .map(scriptProperty => scriptProperty[0]);
        }
      }

      // for each group
      for (let groupId of groupIds) {

        // get archive
        for (let archive of ARCHIVES) {
          if (archive.groupId === groupId || (archive.groupId === "" && groupId === getUser().party._id)) {

            // open folder
            let folder = DriveApp.getFolderById(archive.folderId);

            // check for spreadsheet group ID change
            let groupIdChanged = false;
            let groupId = archive.groupId || getUser().party._id;
            let files = folder.getFiles();
            while (files.hasNext()) {
              let file = files.next();
              if (file.getMimeType() == MimeType.GOOGLE_SHEETS && file.getName().match(/^[0-9]{4}/) !== null) {
                let metadata = openSpreadsheet(file.getId()).getDeveloperMetadata();
                if (metadata.length < 1 || metadata[0].getValue() !== groupId) {
                  groupIdChanged = true;
                  break;
                }
              }
            }
            if (groupIdChanged) {
              throw new Error("The group ID associated with the Google Drive folder \"" + DriveApp.getFolderById(archive.folderId).getName() + "\" has changed. Please move or delete the chat archives in this folder so the script can create new ones.");
            }

            // get group data from API
            if (typeof archive.chat === "undefined") {
              let group = JSON.parse(fetch("https://habitica.com/api/v3/groups/" + (archive.groupId || "party"), GET_PARAMS)).data;
              archive.chat = group.chat;
              if (!archive.name) {
                archive.name = group.name;
              }
            }

            // if group chat has messages
            if (archive.chat.length > 0) {

              console.log("Saving chat history for " + archive.name);

              // split chat messages by year, month
              let chat = {};
              for (let message of archive.chat) {

                let timestamp = new Date(message.timestamp);

                let year = timestamp.getFullYear();
                if (!chat.hasOwnProperty(year)) {
                  chat[year] = {};
                }

                let month = new Intl.DateTimeFormat('en-US', { month: "short" }).format(timestamp);
                if (!chat[year].hasOwnProperty(month)) {
                  chat[year][month] = [];
                }

                chat[year][month].push(message);
              }

              // for each year
              for (let year of Object.keys(chat)) {

                // get spreadsheet for year
                let files = folder.getFiles();
                let spreadsheet;
                while (files.hasNext()) {
                  let file = files.next();
                  if (file.getMimeType() == MimeType.GOOGLE_SHEETS && file.getName().startsWith(year)) {
                    spreadsheet = openSpreadsheet(file.getId());
                    break;
                  }
                }

                // create spreadsheet for year if not already created
                if (typeof spreadsheet === "undefined") {
                  spreadsheet = SpreadsheetApp.create(year + " " + archive.name + " Archive");
                  spreadsheet.addDeveloperMetadata("groupId", archive.groupId || getUser().party._id, SpreadsheetApp.DeveloperMetadataVisibility.DOCUMENT);
                  DriveApp.getFileById(spreadsheet.getId()).moveTo(folder);
                }

                // for each month in year
                for (let month of Object.keys(chat[year])) {

                  // get sheet for month
                  let sheet = spreadsheet.getSheetByName(month);

                  // create sheet for month if not already created
                  if (sheet === null) {
                    sheet = spreadsheet.insertSheet(month, spreadsheet.getNumSheets());
                  }

                  // print headings
                  let headings = ["ID", "Timestamp", "Username", "Likes", "Text", "Unformatted Text"];
                  sheet.getRange(1, 1, 1, headings.length).setValues([headings]).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");

                  // find oldest chat message in sheet
                  let oldestMessageRow = 2;
                  if (sheet.getRange(oldestMessageRow, 1).getValue() !== "") {
                    let oldestMessageId = chat[year][month][chat[year][month].length-1]._id;
                    let messageIds = sheet.getRange(2, 1, sheet.getLastRow()-1, 1).getValues();
                    for (; oldestMessageRow<messageIds.length+2; oldestMessageRow++) {
                      if (messageIds[oldestMessageRow-2][0] == oldestMessageId) {
                        break;
                      }
                    }
                  }

                  // delete chat messages starting at oldest message
                  sheet.getRange(oldestMessageRow, 1, Math.max(1, sheet.getLastRow()-oldestMessageRow+1), sheet.getLastColumn()).clearContent();

                  // for each message
                  for (let i=chat[year][month].length-1; i>=0; i--) {

                    // get timestamp
                    let timestamp = new Date(chat[year][month][i].timestamp);
                    let timezoneOffset = -timestamp.getTimezoneOffset()/60;
                    if (timezoneOffset == 0) {
                      timezoneOffset = "";
                    } else if (timezoneOffset > 0) {
                      timezoneOffset = "+" + timezoneOffset;
                    }
                    timestamp = timestamp.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }).replaceAll(",", "").replaceAll(" 24:", " 00:").replace(" AM", "").replace(" PM", "") + " GMT" + timezoneOffset;

                    // print to sheet
                    sheet.getRange(oldestMessageRow+(chat[year][month].length-1-i), 1, 1, headings.length).setValues([[chat[year][month][i]._id, timestamp, chat[year][month][i].username, Object.keys(chat[year][month][i].likes).length, chat[year][month][i].text, chat[year][month][i].unformattedText]]);
                  }

                  // format sheet
                  sheet.autoResizeColumns(1, sheet.getLastColumn()-2).setColumnWidth(1, sheet.getColumnWidth(1)/2).setColumnWidth(2, 113).setColumnWidths(sheet.getLastColumn()-1, 2, 400).setFrozenRows(1);
                  sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).setHorizontalAlignment("center").setVerticalAlignment("top").setWrap(true);
                  sheet.getRange(2, sheet.getLastColumn()-1, sheet.getLastRow()-1, 2).setHorizontalAlignment("left");
                }

                // delete Sheet1 if exists
                let sheet1 = spreadsheet.getSheetByName("Sheet1");
                if (sheet1 !== null) {
                  spreadsheet.deleteSheet(sheet1);
                }
              }

            // if group chat has no messages
            } else {
              console.log("No chat messages to archive");
            }

            break;
          }
        }

        // remove script property for group ID
        scriptProperties.deleteProperty(groupId);
      }

      lock.releaseLock();

    // if lock not acquired, recreate temporary trigger
    } else {
      let triggerNeeded = true;
      if (ScriptApp.getProjectTriggers().length > 0) {
        triggerNeeded = false;
      }
      if (triggerNeeded) {
        ScriptApp.newTrigger("processTrigger")
          .timeBased()
          .after(1)
          .create();
      }
    }

  } catch (e) {
    if (!e.stack.includes("There are too many LockService operations against the same script") && !e.stack.includes("We're sorry, a server error occurred. Please wait a bit and try again.")) {
      throw e;
    }
  }
}

/**
 * openSpreadsheet(id)
 * 
 * Opens the spreadsheet identified by id. Retries every 5s 
 * for up to a min on "Document is missing" error (this error 
 * is a Google Apps Script bug)
 */
function openSpreadsheet(id) {

  // open spreadsheet
  let documentMissing = 0;
  while (true) {
    try {
      return SpreadsheetApp.openById(id);

    // if "document is missing" error, wait 5 seconds & try again
    } catch (e) {
      if (documentMissing < 12 && e.stack.includes("is missing (perhaps it was deleted, or you don't have read access?)")) {
        documentMissing++;
        Utilities.sleep(5000);
      } else {
        throw e;
      }
    }
  }
}

/**
 * fetch(url, params)
 * 
 * Wrapper for Google Apps Script's UrlFetchApp.fetch(url, params):
 * https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app#fetchurl,-params
 * 
 * Retries failed API calls up to 2 times, retries for up to 1 min if 
 * Habitica's servers are down, & handles Habitica's rate limiting.
 */
let rateLimitRemaining;
let rateLimitReset;
function fetch(url, params) {

  // try up to 3 times
  for (let i=0; i<3; i++) {

    // if rate limit reached
    if (rateLimitRemaining != null && Number(rateLimitRemaining) < 1) {

      // wait until rate limit reset
      let waitUntil = new Date(rateLimitReset);
      waitUntil.setSeconds(waitUntil.getSeconds() + 1);
      let now = new Date();
      Utilities.sleep(Math.max(waitUntil.getTime() - now.getTime(), 0));
    }

    // call API
    let response;
    while (true) {
      try {
        response = UrlFetchApp.fetch(url, params);
        break;

      // if address unavailable, wait 5 seconds & try again
      } catch (e) {
        if (!webhook && e.stack.includes("Address unavailable")) {
          Utilities.sleep(5000);
        } else {
          throw e;
        }
      }
    }

    // store rate limiting data
    rateLimitRemaining = response.getHeaders()["x-ratelimit-remaining"];
    rateLimitReset = response.getHeaders()["x-ratelimit-reset"];

    // if success, return response
    if (response.getResponseCode() < 300 || (response.getResponseCode() === 404 && (url === "https://habitica.com/api/v3/groups/party" || url.startsWith("https://habitica.com/api/v3/groups/party/members")))) {
      return response;

    // if rate limited due to running multiple scripts, try again
    } else if (response.getResponseCode() === 429) {
      i--;

    // if 3xx or 4xx or failed 3 times, throw exception
    } else if (response.getResponseCode() < 500 || i >= 2) {
      throw new Error("Request failed for https://habitica.com returned code " + response.getResponseCode() + ". Truncated server response: " + response.getContentText());
    }
  }
}

/**
 * getUser(updated)
 * 
 * Fetches user data from the Habitica API if it hasn't already 
 * been fetched during this execution, or if updated is set to 
 * true.
 */
let user;
function getUser(updated) {
  if (updated || typeof user === "undefined") {
    for (let i=0; i<3; i++) {
      user = fetch("https://habitica.com/api/v3/user", GET_PARAMS);
      try {
        user = JSON.parse(user).data;
        break;
      } catch (e) {
        if (i < 2 && (e.stack.includes("Unterminated string in JSON") || e.stack.includes("Expected ',' or '}' after property value in JSON at position"))) {
          continue;
        } else {
          throw e;
        }
      }
    }
  }
  return user;
}