## A fully integrated dashboard built with technologies like TypeScript, Node.js, Express.js, MongoDB, and Tailwind CSS, allowing you to view statistics such as K/D ratio and time spent in-game, as well as analyze data from Discord. This enables you to track your gaming progress and compare it with other players.

# Work Stages

### 1. Planning and Seeking Inspiration
- The first step in the process of creating the website was to determine its goals and content. I considered what purpose it should serve and what information and features it should include. The next step was to choose the technologies that would best align with the project's objectives and my skills. I then began seeking inspiration. I browsed various websites and dashboards, analyzing their layout, functionality, and aesthetics. My goal was to find the right visual style that would perfectly match the character of the site. Initially, I considered using a neon color palette to reflect the significance of the brand name. However, over time, the website adopted golden hues.

### 2. Discord Bot and Database
- The first stage of coding was not a website, but a Discord Bot, created using the Discord.js library, whose job was to collect as much data as possible, from the Discord server and save it to a MongoDB database. [Guthub bot repository](https://github.com/theoneswhodead/LIT-DiscordBot)

### 3. First Version
- The first version of the website was developed within four weeks. At this stage, the site featured a fully functional registration and login system, as well as an initial design for the dashboard layout.

### 4. Project Redesign
- A change in the brand name led to a shift in the website's color scheme and overall character. The red tones were replaced by gold, and this style carried the project through to its completion.

### 5. Authorization via Discord and Steam
- The creation of the dashboard required that only the person with a given account on Steam or Discord could see their statistics, but Discord and Steam provided such functions and their implementation was not a major difficulty.

### 6. Completion of the Dashboard
- After creating the new design and setting up the authorization system, I set about creating the entire dashboard, all the charts and user tops, the charts were created using ApexChart.

### 7. Two-factor authentication
- Once everything was almost ready I set about putting the final touches on the whole thing, that's when the problem arose that the site might not be secured well enough, to this end I added two-factor authentication, the implementation of which was quite a challenge and an interesting experience.


# Problems and challenges

### 1. Designing the look of the site
- Initially, the site was to be in shades of black and red to reflect the darkness illuminated by the red moon. Creating a site in this style was quite a challenge for me at first. No less I took up the challenge and did my best to ensure that the site conveyed the right atmosphere. Over time, the concept of the name and color scheme changed to gold, in which I felt much more confident, and the process of designing the look became much more pleasant. To design the look of the site, I used the Figma application.

### 2. The use of TypeScript
- The first project in which I used TypeScript. The transition from JavaScript to TypeScript was not a problem, on the contrary it was pleasant and intuitive, the problems began when writing more advanced components, models, connecting to the database. At these moments TypeScript, caused many errors, which significantly prolonged the writing of the page.

### 3. Authorization via Discord and Steam
- An important premise of the project was that a person with a given Discord and Steam account should be able to see their statistics, such functionality could have been done in several simpler ways, but they would not necessarily have been adequate in terms of security, which was unacceptable in this type of service, so there could be no other option than special authentication using Steam and Discord functions provided for this purpose. I had not faced such a task before, but a moment with the documentation was enough to implement this functionality. Currently, the authentication is not perfect, as it does not fully synchronize with the account created on the service (a problem that was supposed to be solved in the future), but only locally provides DiscordID or SteamID when you log into your accounts. Nonetheless, it meets its data security objectives.

### 4. Two-factor authentication
- The most difficult functionality to code on the site was undoubtedly two-factor verification, created using t.i.d. crypto, qrcode, encode and OTPAuth libraries.

**Let's start with how it's even supposed to work:**
- 1. User wishing to enable two-factor verification must click on the button: Enable 2fa
- 2. Request is made to the server to generate the QR code and a form is displayed with instructions:
     - 1. Download and install Google Authenticator on your smartphone
       2. Scan QR Code with Goodle Authenticator
       3. Enter 6-digit code below and your password to activate  2fa
- 3. At the same time, the secret is generated on the server with the help of crypto and encode, and the token is validated.
- 4. If the token is correct using the id that is part of it, the database is updated with the previously generated secret.
- 5. The server then generates a QR code and sends it to the client.
- 6. Now scan the QR code, rewrite the generated 6-digit code from Google Authenticator into the appropriate field, enter the password, and click the button: Activate verification
- 7. At this point, a POST request is sent to the server and, if successful, the cookie is updated.
- 8. Once the POST request is received on the server, the received code and password are validated.
- 9. If both values are previous the enable2fa field is changed to true - Verification has been enabled.
- 10. When trying to log in, an analogous verification occurs.

