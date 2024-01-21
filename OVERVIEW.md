# Overview

# Project Implementation

## Project Structure

The project is implemented using Next.js and follows a modular organization for improved scalability and maintainability:

**/app**: Contains the main application logic, including pages, and global styles.

**/components**: Reusable components, such as Header,CreateForm, DeleteItem,EditForm,FilteredDropDown,GoogleMap,HotelChainForm,HetelChainFormList,HotelForm,HotelList,HotelListItem,Search,View, and modal Components are stored here, promoting a component-driven development approach.

**/context**: State management is handled using context providers and consumers, ensuring easy accessibility of the application's state to the necessary components , Localstorage was also used to ensure data is persisted except if the user clears that localstorage.

**src/utils**: Utility functions reside here, promoting code reuse and maintainability.

## Data Fetching

Data is fetched and created using the localstorage

### Hotel Page

The Hotel Page offers a comprehensive view of all created hotels which includes the Name, Address, City,Country,ChainID where chainId represent the category where each hotel falls in. Here I used star ratting from 1 - 5 as category. On the page you can Edit or Delete and View data using the drop down provided there. Each of the item in the drop down will display modal that you can perform the respective action.

### Hotel Chain Page

The Hotel Page offers a comprehensive view of all created hotel Chain which includes the Name,a and Id of the Hotel Chain on the page you can create /delete hotel chain.

For Uniformity, the hotel chain page can be created to look like the hotel page it self, that can also inprove the user experience.

## Responsiveness

The application is designed to be responsive on various devices, leveraging the utility classes provided by Tailwind CSS. This ensures a scalable and maintainable design across different screen sizes.

## Trade-offs

### Authentication

While the project currently doesn't implement user authentication. incorporating authentication would be crucial in a real-world scenario. By adding authentication, the application will be secured providing a more reliable experience for users.

### Error Handling

The error-handling mechanism in the current implementation is basic. For a production-ready application, a more robust error-handling strategy could be employed. This might include implementing detailed error messages, logging errors for easier debugging, and providing a user-friendly interface for error feedback. Improving error handling enhances the overall user experience and aids in diagnosing issues during development and deployment.

## Potential Extensions

### Authentication Enhancement

Implementing user authentication with personal access tokens. This would not only address security concerns but also provide a more secure way to interact with the application.

### Pagination for Large Datasets

Introducing pagination for users and repositories would enhance the application's scalability. This improvement ensures a smoother user experience when dealing with large datasets, preventing potential performance bottlenecks. Implementing a paginated approach allows users to explore extensive lists of users or repositories more efficiently.

### Testing

Unit tests using `@testing-library` like Jest should be in place to include integration and end-to-end tests. This would provide test coverage, ensuring that different parts of the application work seamlessly together. Comprehensive testing is essential for maintaining the reliability and stability of the application, especially as it evolves and new features are introduced.

### Progressive Loading and Infinite Scrolling

To further optimize the user experience, consider incorporating progressive loading or infinite scrolling. Instead of loading all data at once, the application could load content as the user scrolls, reducing initial page load times. This technique improves perceived performance and responsiveness.

## Instructions to Run the Application

1.  Clone the repository:

    `git clone https://github.com/solomonsunday/hotel-ranking.git`

2.  Navigate to the project directory:

    `cd HOTEL RANKING`

3.  Install dependencies:

    `npm install`

4.  Run the development server:

    `npm run dev or yarn dev`

5.  Open your browser and visit [http://localhost:3000](http://localhost:3000/) to view the application.
