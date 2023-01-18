***Auto Archive Chats is currently in beta. There are still some edge cases that haven't been tested yet, so it may not work perfectly for you. If you're not okay with this, best to wait until Version 1 is released! If you get an error while running this script or the output is not what you expect, please let me know!***

## Summary
Automatically archives all chat messages from the provided Habitica guilds (and/or the user's party) into Google Drive folders. Each archive (folder) contains one spreadsheet for each year, and each spreadsheet contains one sheet/tab for each month. When chat messages fall off the 200 message "cliff" in Habitica, they will remain in the archive.

## Setup Instructions
You need to use a desktop computer for this. It will not work on a phone or tablet!
1. You need to be a member of each party & guild you are archiving. If you want to archive a guild you're not a member of, join it now. If you don't want to join all the guilds you're archiving, you can create another Habitica account, join the guilds with that account, grant that account's email address [Editor access](https://support.google.com/drive/answer/7166529?hl=en&co=GENIE.Platform%3DDesktop) to your Google Drive folders (which you will create in step 8 below), and set up this script for that account instead.
2. Click [here](https://script.google.com/d/1rs7BWH1-uqupqDWplDRE-cPNeFuo6S1J-Iibwod00aBjmxhwpL1TwlHV/edit?usp=sharing) to go to the Auto Archive Chats script. If you're not already signed into your Google account, you will be asked to sign in.
3. In the main menu on the left, click on "Overview" (looks like a lowercase letter i inside a circle).
4. Click the "Make a copy" button (looks like two pages of paper).
5. At the top of your screen, click on "Copy of Auto Archive Chats". Rename it "Auto Archive Chats" and click the "Rename" button.
6. Click [here](https://habitica.com/user/settings/api) to open your API Settings. Highlight and copy your User ID (it looks something like this: `35c3fb6f-fb98-4bc3-b57a-ac01137d0847`). In the Auto Archive Chats script, paste your User ID between the quotations where it says `const USER_ID = "";`. It should now look something like this: `const USER_ID = "35c3fb6f-fb98-4bc3-b57a-ac01137d0847";`
7. On the same page where you copied your User ID, click the "Show API Token" button, and copy your API Token. In the Auto Archive Chats script, paste your API Token between the quotations where it says `const API_TOKEN = "";`. It should now look something like this: `const API_TOKEN = "35c3fb6f-fb98-4bc3-b57a-ac01137d0847";`
8. For each guild you want to archive, visit the guild in a web browser and copy the guild ID at the end of the URL in your browser's address bar (the guild ID is everything after the last `/`, it looks just like your User ID and API Token). In your script, paste the guild ID between the quotations where it says `groupId: ""`. If you want to archive your party chat, you don't need an ID, just leave the quotations empty. Next, create a Google Drive folder for that guild (or party), navigate into the folder in your web browser, copy the folder ID (everything after the last `/` in the URL), and paste it in between the quotations where it says `folderId: ""`. If you want, you can add a name in between the quotations where it says `name: ""`, to help you remember what guild or party you are archiving. You can copy & paste the `{}` containing the `name`, `groupId`, and `folderId` as many times as you want, for as many guilds as you want! Just make sure every `{}` except for the last one has a comma after it.
9. Click the "Save project" button near the top of the page (looks like a floppy disk).
10. Click the blue "Deploy" button near the top of the page, then click "New deployment". Under "Description", type "Auto Archive Chats" (without the quotes). Then click the "Deploy" button.
11. Click the "Authorize access" button and select your Google account. Click on "Advanced", then "Go to Auto Archive Chats (unsafe)". (Don't worry, it is safe!) Then click the "Allow" button.
12. Under "Web app", click the "Copy" button to copy the Web App URL. Then click the "Done" button.
13. Paste your Web App URL inside the quotations where it says `const WEB_APP_URL = "";`.
14. Click the drop-down menu to the right of the "Debug" button, near the top of the page. Select "install" from the drop-down.
15. Click the "Run" button to the left of the "Debug" button. Wait for it to say "Execution completed".
16. If you want to share a chat archive with others, right-click (Windows/Linux) or Ctrl+click (Mac) on the Google Drive folder in your web browser, then click "Share". Click the dropdown under "General access", and select "Anyone with the link". Then click the "Copy link" button and share that link with whoever you want.

You're all done! If you need to change the settings or uninstall the script at some point, follow the steps below.

## Changing the Settings
You need to use a desktop computer for this. It will not work on a phone or tablet!
1. [Click here](https://script.google.com/home) to see a list of your scripts. If you're not already signed into your Google account, click the "Start Scripting" button and sign in. Then click on "My Projects" in the main menu on the left.
2. Click on "Auto Archive Chats".
3. Edit the settings (`const`s) to your liking.
4. Click the "Save project" button near the top of the page (looks like a floppy disk).
5. Click the blue "Deploy" button near the top of the page, then click "Manage deployments".
6. Click the "Edit" button (looks like a pencil). Under "Version", select "New version".
7. Click the "Deploy" button, then the "Done" button.
8. Click the drop-down menu to the right of the "Debug" button, near the top of the page. Select "install" from the drop-down.
9. Click the "Run" button to the left of the "Debug" button. Wait for it to say "Execution completed".

## Uninstalling the Script
1. [Click here](https://script.google.com/home) to see a list of your scripts. If you're not already signed into your Google account, click the "Start Scripting" button and sign in. Then click on "My Projects" in the main menu on the left.
2. Click on "Auto Archive Chats".
3. Click the drop-down menu to the right of the "Debug" button, near the top of the page. Select "uninstall" from the drop-down.
4. Click the "Run" button to the left of the "Debug" button. Wait for it to say "Execution completed".
5. Click the blue "Deploy" button near the top of the page, then click "Manage deployments".
6. Click the "Archive" button (looks like a box with a down arrow inside). Then click the "Done" button.

## Updating the Script
You need to use a desktop computer for this. It will not work on a phone or tablet!
1. Follow the steps in [Uninstalling the Script](#uninstalling-the-script) above.
2. Copy & paste your settings (`const`s) into a text editor so you can reference them while setting up the new version.
3. In the main menu on the left, click on "Overview" (looks like a lowercase letter i inside a circle).
4. Click the "Remove project" button (looks like a trash can).
5. Follow the [Setup Instructions](#setup-instructions) above.

## Contact
❔ Questions: [https://github.com/bumbleshoot/auto-archive-chats/discussions/categories/q-a](https://github.com/bumbleshoot/auto-archive-chats/discussions/categories/q-a)  
💡 Suggestions: [https://github.com/bumbleshoot/auto-archive-chats/discussions/categories/suggestions](https://github.com/bumbleshoot/auto-archive-chats/discussions/categories/suggestions)  
🐞 Report a bug: [https://github.com/bumbleshoot/auto-archive-chats/issues](https://github.com/bumbleshoot/auto-archive-chats/issues)  
💗 Donate: [https://github.com/sponsors/bumbleshoot](https://github.com/sponsors/bumbleshoot)