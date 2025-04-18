/*:
 * @plugindesc Custom function to show message and keep it visible during choices - v1.0
 * @author ChatGPT
 */

(function() {
    /**
     * Shows a message and displays choices without clearing the message window.
     * @param {string} text - The message to display.
     * @param {Array<string>} choices - The choices to show.
     * @param {function(number): void} callback - Called with the choice index.
     */
    window.ShowMessageWithChoice = function(text, choices, callback) {
      // Add the main message
      $gameMessage.add(text);
  
      // Set choices with default index 0, cancel -1
      $gameMessage.setChoices(choices, 0, -1);
  
      // Set choice callback with frame delay to keep text visible
      $gameMessage.setChoiceCallback(function(choice) {
        setTimeout(function() {
          if (typeof callback === 'function') {
            callback(choice);
          }
        }, 10); // Small delay to prevent message clear
      });
    };
  })();