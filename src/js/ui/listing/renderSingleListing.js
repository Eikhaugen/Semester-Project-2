export function renderSingleListing(listing, listingContainer, bidsContainer) {
  listingContainer.innerHTML = "";
  bidsContainer.innerHTML = "";

  const { title, media, _count, bids, endsAt, description, seller } = listing;

  const highestBid = bids.length > 0 ? Math.max(...bids.map(bid => bid.amount)) : 0;

  // Main container
  const listingElement = document.createElement("div");
  listingElement.className = "w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-6 flex flex-col md:flex-row";

  // Image element
  const img = document.createElement("img");
  img.src = media[0]?.url || '/default-placeholder.jpg';
  img.alt = media[0]?.alt || 'Listing image';
  img.className = "w-full md:max-w-96 h-64 md:h-full object-cover";

  // Content container
  const contentDiv = document.createElement("div");
  contentDiv.className = "p-6 flex-1";

  // Title
  const titleElement = document.createElement("h2");
  titleElement.textContent = title;
  titleElement.className = "text-2xl md:text-3xl font-bold mb-4";

  // Seller info
  const sellerElement = document.createElement("p");
  sellerElement.innerHTML = `<strong>Seller:</strong> ${seller.name}`;
  sellerElement.className = "text-gray-700 mb-2 text-sm md:text-base";

  // Description
  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = description;
  descriptionElement.className = "text-gray-600 mb-4 text-sm md:text-base";

  // Details container
  const detailsDiv = document.createElement("div");
  detailsDiv.className = "flex justify-between items-center text-gray-600 mb-4 text-sm md:text-base";

  // Bid count
  const bidCountDiv = document.createElement("div");
  bidCountDiv.className = "flex items-center gap-2";

  const bidCountSpan = document.createElement("span");
  bidCountSpan.textContent = _count.bids;
  bidCountSpan.className = "font-medium";

  const bidLabelSpan = document.createElement("span");
  bidLabelSpan.textContent = "bids";

  bidCountDiv.appendChild(bidCountSpan);
  bidCountDiv.appendChild(bidLabelSpan);

  // Time remaining
  const timeRemainingDiv = document.createElement("div");
  timeRemainingDiv.className = "text-sm font-medium";
  timeRemainingDiv.textContent = getTimeRemaining(endsAt);

  detailsDiv.appendChild(bidCountDiv);
  detailsDiv.appendChild(timeRemainingDiv);

  // Highest bid
  const highestBidElement = document.createElement("p");
  highestBidElement.textContent = `Highest Bid: ${highestBid} Credits`;
  highestBidElement.className = "text-lg md:text-xl font-semibold text-green-600";

  // Append elements to contentDiv
  contentDiv.appendChild(titleElement);
  contentDiv.appendChild(sellerElement);
  contentDiv.appendChild(descriptionElement);
  contentDiv.appendChild(detailsDiv);
  contentDiv.appendChild(highestBidElement);

  // Append image and content to listingElement
  listingElement.appendChild(img);
  listingElement.appendChild(contentDiv);

  // Add the listingElement to the listingContainer
  listingContainer.appendChild(listingElement);

  // Render bids
  if (bids.length > 0) {
    // Sort bids by date (latest first)
    const sortedBids = bids.sort((a, b) => new Date(b.created) - new Date(a.created));

    sortedBids.forEach((bid) => {
      const bidElement = document.createElement("div");
      bidElement.className = "flex items-center bg-gray-50 p-4 rounded-lg shadow-sm mb-4";

      // Bidder avatar
      const avatar = document.createElement("img");
      avatar.src = bid.bidder.avatar.url;
      avatar.alt = bid.bidder.avatar.alt || "Bidder avatar";
      avatar.className = "w-12 h-12 rounded-full object-cover mr-4";

      // Bid details container
      const bidDetails = document.createElement("div");
      bidDetails.className = "flex-1";

      // Bidder name
      const bidderName = document.createElement("h3");
      bidderName.textContent = bid.bidder.name;
      bidderName.className = "font-semibold text-gray-800 mb-1";

      // Bid amount and time
      const bidInfo = document.createElement("div");
      bidInfo.className = "flex justify-between items-center text-gray-600 text-sm md:text-base";

      const bidAmount = document.createElement("span");
      bidAmount.textContent = `${bid.amount} credits`;
      bidAmount.className = "font-medium";

      const bidTime = document.createElement("span");
      bidTime.textContent = formatDate(bid.created);

      bidInfo.appendChild(bidAmount);
      bidInfo.appendChild(bidTime);

      bidDetails.appendChild(bidderName);
      bidDetails.appendChild(bidInfo);

      // Assemble bid element
      bidElement.appendChild(avatar);
      bidElement.appendChild(bidDetails);

      bidsContainer.appendChild(bidElement);
    });
  } else {
    const noBidsMessage = document.createElement("p");
    noBidsMessage.textContent = "No bids yet.";
    noBidsMessage.className = "text-center text-gray-500 mt-4";
    bidsContainer.appendChild(noBidsMessage);
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getTimeRemaining(endsAt) {
  const now = new Date();
  const endDate = new Date(endsAt);
  const diff = endDate - now;

  if (diff <= 0) {
    return "Auction ended";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return `${days}d ${hours}hrs remaining`;
}
