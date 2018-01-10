const { createMessageAdapter } = require('@slack/interactive-messages');

// Initialize adapter using verification token from environment variables
const slackMessages = createMessageAdapter('4P0NAlncQDhcaOT6iyMzVJiB');

// Attach action handlers by `callback_id`
// (See: https://api.slack.com/docs/interactive-message-field-guide#attachment_fields)
slackMessages.action('/welcome_button/', (payload) => {
    console.log(payload)
    // `payload` is JSON that describes an interaction with a message.
    // console.log(`The user ${payload.user.name} in team ${payload.team.domain} pressed the welcome button`);
    //
    // // The `actions` array contains details about the specific action (button press, menu selection, etc.)
    // const action = payload.actions[0];
    // console.log(`The button had name ${action.name} and value ${action.value}`);
    //
    // // You should return a JSON object which describes a message to replace the original.
    // // Note that the payload contains a copy of the original message (`payload.original_message`).
    // const replacement = payload.original_message;
    // // Typically, you want to acknowledge the action and remove the interactive elements from the message
    // // const replacement.text =`Welcome ${payload.user.name}`;
    // delete replacement.attachments[0].actions;
    // return replacement;
});

// Start the built-in HTTP server
const port = process.env.PORT || 9000;
slackMessages.start(port).then(() => {
    console.log(`server listening on port ${port}`);
});