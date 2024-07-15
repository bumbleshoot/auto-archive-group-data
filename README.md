***Auto Archive Group Data is currently in beta. There are still some edge cases that haven't been tested yet, so it may not work perfectly for you. If you're not okay with this, best to wait until Version 1 is released! If you get an error while running this script or the output is not what you expect, please submit a bug report [here](https://github.com/bumbleshoot/auto-archive-group-data/issues)!***

## Summary
Archives all guild/party (group) data for multiple groups to spreadsheets in Google Drive folders. Archived data includes:
* Guild name, ID, leader, member count, summary, description
* Member list
* Challenges
* Chat messages

The script can also be set up to archive chat messages automatically, whenever the group receives a new chat message.

## Setup Instructions
It is highly recommended that you use a desktop computer for this, as some of the steps don't work well on mobile.
1. You need to be a member of each party & guild you are archiving. If you want to archive a guild you're not a member of, join it now. If you don't want to join all the guilds you're archiving, you can create another Habitica account, join the guilds with that account, grant that account's email address [Editor access](https://support.google.com/drive/answer/7166529?hl=en&co=GENIE.Platform%3DDesktop) to your Google Drive folders (which you will create in step 8 below), and set up this script for that account instead.
2. Click [here](https://script.google.com/d/1nMpYn3bJUo6xUEHv8ve9VB5U2jlQlNm8U6_yEkXJA1Z_sAcA8l6MxaKA/edit?usp=sharing) to go to the Auto Archive Group Data script. If you're not already signed into your Google account, you will be asked to sign in.
3. In the main menu on the left, click on "Overview" (looks like a lowercase letter i inside a circle).
4. Click the "Make a copy" button (looks like two pages of paper).
5. At the top of your screen, click on "Copy of Auto Archive Group Data". Rename it "Auto Archive Group Data" and click the "Rename" button.
6. Click [here](https://habitica.com/user/settings/api) to open your API Settings. Highlight and copy your User ID (it looks something like this: `35c3fb6f-fb98-4bc3-b57a-ac01137d0847`). In the Auto Archive Group Data script, paste your User ID between the quotations where it says `const USER_ID = "";`. It should now look something like this: `const USER_ID = "35c3fb6f-fb98-4bc3-b57a-ac01137d0847";`
7. On the same page where you copied your User ID, click the "Show API Token" button, and copy your API Token. In the Auto Archive Group Data script, paste your API Token between the quotations where it says `const API_TOKEN = "";`. It should now look something like this: `const API_TOKEN = "35c3fb6f-fb98-4bc3-b57a-ac01137d0847";`
8. Set each of the `ARCHIVE_GROUP_INFO`, `ARCHIVE_GROUP_MEMBERS`, `ARCHIVE_GROUP_CHALLENGES`, and `ARCHIVE_GROUP_CHATS` to either `true` or `false` depending on what data you want to archive.
9. If you are archiving your party chat and don't want skill casts to be included in the party chat archive, set `OMIT_SKILL_CASTS` to `true`.
10. For each guild you want to archive, visit the guild in a web browser and copy the URL in your browser's address bar. In your script, paste the URL between the quotations where it says `groupURL: ""`. If you want to archive your party chat, you don't need a URL, just leave the quotations empty. Next, create a Google Drive folder for that guild (or party), navigate into the folder in your web browser, copy the folder URL, and paste it in between the quotations where it says `folderURL: ""`. If you want, you can add a name in between the quotations where it says `name: ""`, to help you remember what guild or party you are archiving. You can copy & paste the `{}` containing the `name`, `groupId`, and `folderId` as many times as you want, for as many guilds as you want! Just make sure every `{}` except for the last one has a comma after it.
11. Click the "Save project" button near the top of the page (looks like a floppy disk).
12. In the main menu on the left, click on "Project Settings" (looks like a cog).
13. Click on the "Time zone" drop down and select the time zone you would like the chat archives to use.
Now, follow the instructions in [Archiving Group Data Once](#archiving-group-data-once) and/or [Archiving Chats Automatically](#archiving-chats-automatically).

## Archiving Group Data Once
Make sure you follow the [Setup Instructions](#setup-instructions) first!
1. [Click here](https://script.google.com/home) to see a list of your scripts. If you're not already signed into your Google account, click the "Start Scripting" button and sign in. Then click on "My Projects" in the main menu on the left.
2. Click on "Auto Archive Group Data".
3. Click the drop-down menu to the right of the "Debug" button, near the top of the page. Select "archiveGroupData" from the drop-down.
4. Click the "Run" button to the left of the "Debug" button.
5. (If this is your first time running the script) Click the "Review permissions" button and select your Google account. Click on "Advanced", then "Go to Auto Archive Group Data (unsafe)". (Don't worry, it is safe!) Then click "Continue", then "Allow".
6. Wait for the "Execution completed" message in the Execution Log.
7. If you get an error that says "Exceeded maximum execution time", just run the script again. Keep running it until it finishes archiving all the data.
8. If you want to share a group archive with others, right-click (Windows/Linux) or Ctrl+click (Mac) on the Google Drive folder in your web browser, then click "Share". Click the dropdown under "General access", and select "Anyone with the link". Then click the "Copy link" button and share that link with whoever you want.

## Archiving Chats Automatically
Make sure you follow the [Setup Instructions](#setup-instructions) first!
1. [Click here](https://script.google.com/home) to see a list of your scripts. If you're not already signed into your Google account, click the "Start Scripting" button and sign in. Then click on "My Projects" in the main menu on the left.
2. Click on "Auto Archive Group Data".
3. Click the blue "Deploy" button near the top of the page, then click "New deployment", then click the "Deploy" button.
4. Click the "Authorize access" button and select your Google account. Click on "Advanced", then "Go to Auto Archive Group Data (unsafe)". (Don't worry, it is safe!) Then click the "Allow" button.
5. Under "Web app", click the "Copy" button to copy the Web App URL. Then click the "Done" button.
6. Paste your Web App URL inside the quotations where it says `const WEB_APP_URL = "";`.
7. Click the drop-down menu to the right of the "Debug" button, near the top of the page. Select "install" from the drop-down.
8. Click the "Run" button to the left of the "Debug" button. Wait for it to say "Execution completed".
9. If you want to share a group archive with others, right-click (Windows/Linux) or Ctrl+click (Mac) on the Google Drive folder in your web browser, then click "Share". Click the dropdown under "General access", and select "Anyone with the link". Then click the "Copy link" button and share that link with whoever you want.

You're all done! If you need to change the settings (including the time zone) or uninstall the script at some point, follow the steps below.

## Changing the Settings
It is highly recommended that you use a desktop computer for this, as some of the steps don't work well on mobile.
1. [Click here](https://script.google.com/home) to see a list of your scripts. If you're not already signed into your Google account, click the "Start Scripting" button and sign in. Then click on "My Projects" in the main menu on the left.
2. Click on "Auto Archive Group Data".
3. Edit the settings (`const`s) to your liking.
4. Click the "Save project" button near the top of the page (looks like a floppy disk).
5. If you want to change the time zone, click on "Project Settings" in the main menu, select the new time zone, then click on "Editor" in the main menu.
If you are not archiving chats automatically, you can stop here. Otherwise, continue to the next step.
6. Click the blue "Deploy" button near the top of the page, then click "Manage deployments".
7. Click the "Edit" button (looks like a pencil). Under "Version", select "New version".
8. Click the "Deploy" button, then the "Done" button.
9. Click the drop-down menu to the right of the "Debug" button, near the top of the page. Select "install" from the drop-down.
10. Click the "Run" button to the left of the "Debug" button. Wait for it to say "Execution completed".

## Uninstalling the Script
This is only necessary if you are archiving chats automatically. It is highly recommended that you use a desktop computer for this, as some of the steps don't work well on mobile.
1. [Click here](https://script.google.com/home) to see a list of your scripts. If you're not already signed into your Google account, click the "Start Scripting" button and sign in. Then click on "My Projects" in the main menu on the left.
2. Click on "Auto Archive Group Data".
3. Click the drop-down menu to the right of the "Debug" button, near the top of the page. Select "uninstall" from the drop-down.
4. Click the "Run" button to the left of the "Debug" button. Wait for it to say "Execution completed".
5. Click the blue "Deploy" button near the top of the page, then click "Manage deployments".
6. Click the "Archive" button (looks like a box with a down arrow inside). Then click the "Done" button.

## Updating the Script
It is highly recommended that you use a desktop computer for this, as some of the steps don't work well on mobile.
1. Follow the steps in [Uninstalling the Script](#uninstalling-the-script) above.
2. Copy & paste your settings (`const`s) into a text editor so you can reference them while setting up the new version.
3. In the main menu on the left, click on "Overview" (looks like a lowercase letter i inside a circle).
4. Click the "Remove project" button (looks like a trash can).
5. Follow the [Setup Instructions](#setup-instructions) above.

## Contact
❔ Questions: [https://github.com/bumbleshoot/auto-archive-group-data/discussions/categories/q-a](https://github.com/bumbleshoot/auto-archive-group-data/discussions/categories/q-a)  
💡 Suggestions: [https://github.com/bumbleshoot/auto-archive-group-data/discussions/categories/suggestions](https://github.com/bumbleshoot/auto-archive-group-data/discussions/categories/suggestions)  
🐞 Report a bug: [https://github.com/bumbleshoot/auto-archive-group-data/issues](https://github.com/bumbleshoot/auto-archive-group-data/issues)  
💗 Donate: [https://github.com/sponsors/bumbleshoot](https://github.com/sponsors/bumbleshoot)