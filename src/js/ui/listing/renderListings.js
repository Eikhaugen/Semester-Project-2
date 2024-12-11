import { isLoggedIn } from "../../utils/authGuard";

function truncateTitle(title, maxLength = 35) {
    if (title.length > maxLength) {
        return title.substring(0, maxLength) + "...";
    }
    return title;
}

export function renderListings(listings, container) {
    container.innerHTML = "";

    listings.forEach((listing) => {
        let listingElement;

        if (isLoggedIn()) {
            listingElement = document.createElement("a");
            listingElement.className = "block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300";
            listingElement.href = `/listing/?id=${listing.id}`;
        } else {
            listingElement = document.createElement("div");
            listingElement.className = "block bg-white shadow-md rounded-lg overflow-hidden";
        }

        // Image container
        const imgContainer = document.createElement("div");
        imgContainer.className = "h-40 overflow-hidden";

        const img = document.createElement("img");
        if (listing.media.length > 0) {
            img.src = listing.media[0].url;
            img.alt = listing.media[0].alt || "Listing Image";
        } else {
            img.src = "default-placeholder.jpg";
            img.alt = "No image available";
        }

        img.className = "object-cover object-center w-full h-full";
        imgContainer.appendChild(img);

        // Content container
        const contentDiv = document.createElement("div");
        contentDiv.className = "p-4 flex flex-col gap-2";

        // Title
        const title = document.createElement("h2");
        const fullTitle = listing.title || "Untitled";
        title.textContent = truncateTitle(fullTitle, 20);
        title.className = "text-lg font-semibold text-gray-800";

        // Details container
        const detailsDiv = document.createElement("div");
        detailsDiv.className = "flex justify-between items-center text-sm text-gray-600";

        // Price and bids
        const priceDiv = document.createElement("div");
        priceDiv.className = "flex flex-col";

        const priceSpan = document.createElement("span");
        priceSpan.textContent = `${listing._count.bids || 0} bids`;
        priceSpan.className = "text-gray-500";

        const highestBid = listing.bids?.reduce((max, bid) => Math.max(max, bid.amount), 0) || 0;
        const highestBidSpan = document.createElement("span");
        highestBidSpan.textContent = `Highest Bid: ${highestBid} Credits`;
        highestBidSpan.className = "font-medium text-green-600";

        priceDiv.appendChild(priceSpan);
        priceDiv.appendChild(highestBidSpan);

        // Time left
        const timeDiv = document.createElement("div");
        timeDiv.className = "text-gray-500";

        const timeSpan = document.createElement("span");
        const endsAt = new Date(listing.endsAt);
        const now = new Date();
        const timeLeft = Math.max(0, endsAt - now);
        const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        timeSpan.textContent = `${daysLeft}d ${hoursLeft}hrs`;

        timeDiv.appendChild(timeSpan);

        detailsDiv.appendChild(priceDiv);
        detailsDiv.appendChild(timeDiv);

        contentDiv.appendChild(title);
        contentDiv.appendChild(detailsDiv);

        listingElement.appendChild(imgContainer);
        listingElement.appendChild(contentDiv);

        container.appendChild(listingElement);
    });
}
