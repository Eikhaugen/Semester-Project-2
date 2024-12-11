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
            listingElement.className = "listing-link bg-blue-500 w-full rounded-lg"; 
            listingElement.href = `/listing/?id=${listing.id}`;
        } else {
            listingElement = document.createElement("div");
            listingElement.className = "listing-div bg-blue-500"; 
        }

        const img = document.createElement("img");
        if (listing.media.length > 0) {
            img.src = listing.media[0].url;
            img.alt = listing.media[0].alt || "Listing Image";
        } else {
            img.src = "default-placeholder.jpg";
            img.alt = "No image available";
        }

        const contentDiv = document.createElement("div");
        contentDiv.className = "listing-content bg-blue-500";

        const title = document.createElement("h2");
        const fullTitle = listing.title || "Untitled";
        title.textContent = truncateTitle(fullTitle, 20);

        const detailsDiv = document.createElement("div");
        detailsDiv.className = "listing-details";

        const priceDiv = document.createElement("div");
        priceDiv.className = "listing-price";
        const priceSpan = document.createElement("span");
        priceSpan.textContent = `${listing._count.bids || 0} bids`;

        const highestBid = listing.bids?.reduce((max, bid) => Math.max(max, bid.amount), 0) || 0;
        const highestBidSpan = document.createElement("span");
        highestBidSpan.textContent = `Highest Bid: ${highestBid} Credits`;

        priceDiv.appendChild(priceSpan);
        priceDiv.appendChild(highestBidSpan);

        const timeDiv = document.createElement("div");
        timeDiv.className = "listing-time";
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
        listingElement.appendChild(img);
        listingElement.appendChild(contentDiv);

        container.appendChild(listingElement);
    });
}
