# User List

This is a user listing application that fetches users from the Stack Exchange API and displays them in a paginated list. Users can be followed, blocked, and their options can be viewed.

## Installation

1. Clone the repository:

git clone https://github.com/PapikiInc/zepz_flow_users

2. Navigate to the project directory:

cd zepz_flow_users

3. Install the dependencies:

npm install

4. Start the application:

npm start

The application will be running at http://localhost:3000.

## Usage

- The user list is displayed on the home page.
- Each user card contains their avatar, display name, and reputation.
- Click on the "View Options" button to expand the options for each user.
- Options include "Follow" to follow a user, "Unfollow" to unfollow a user, and "Block" to block a user.
- Blocked users are disabled and visually differentiated from other users.
- Pagination is available at the bottom of the user list, allowing navigation between pages.

## Testing
- Unit testing is an essential part of our development process. It helps ensure the stability and reliability of the codebase. We use the Jest testing framework for writing and running tests.

- To run the unit tests, use the following command:
npm test

- We encourage developers to write additional tests for new components or features. Tests should cover various scenarios and edge cases to validate the expected behavior and catch bugs early.

## Technologies Used

- React: JavaScript library for building user interfaces.
- Material-UI: UI component library for React.
- Stack Exchange API: API for accessing Stack Exchange sites data.

## Contributing

Contributions are welcome! If you have any improvements or bug fixes, feel free to create an issue or submit a pull request.

## License

This project is licensed under the MIT License.

