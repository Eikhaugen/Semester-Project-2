import { fetchListings } from "../../api/listing/read";
import { renderListings } from "./renderListings";

/**
 * Initializes sorting and pagination controls.
 * @param {HTMLElement} listingsContainer - The container where listings will be rendered.
 */
export function initListingControls(listingsContainer) {
  let currentPage = 1;

  const sortCriteriaSelect = document.getElementById('sortCriteria');
  const sortOrderSelect = document.getElementById('sortOrder');
  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');
  const currentPageDisplay = document.getElementById('currentPage');

  async function handleDataFetch() {
    const sortCriteria = sortCriteriaSelect.value;
    const sortOrder = sortOrderSelect.value;

    try {
      const listings = await fetchListings(currentPage, sortCriteria, sortOrder);
      renderListings(listings, listingsContainer);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  }

  sortCriteriaSelect.addEventListener('change', () => {
    currentPage = 1;
    updatePaginationButtons();
    handleDataFetch();
  });

  sortOrderSelect.addEventListener('change', () => {
    currentPage = 1;
    updatePaginationButtons();
    handleDataFetch();
  });

  nextPageBtn.addEventListener('click', () => {
    currentPage++;
    updatePaginationButtons();
    handleDataFetch();
  });

  prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updatePaginationButtons();
      handleDataFetch();
    }
  });

  function updatePaginationButtons() {
    currentPageDisplay.textContent = `Page ${currentPage}`;
    prevPageBtn.classList.toggle('hidden', currentPage === 1);
  }

  // Initialize the UI on page load
  updatePaginationButtons();
  handleDataFetch();
}
