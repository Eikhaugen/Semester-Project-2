export function renderSingleListing(listing, listingContainer, bidsContainer) {
    listingContainer.innerHTML = "";
    bidsContainer.innerHTML = "";
  
    const { title, media, _count, bids, endsAt } = listing;
    
    const listingHTML = `
      <div>
        <a href="#">
          <img src="${media[0]?.url || ''}" alt="${media[0]?.alt || 'Listing image'}">
        </a>
        <div>
          <h2>${title}</h2>
          <div>
            <div>
              <span>${_count.bids} bids</span>
            </div>
            <div>
              <span>${getTimeRemaining(endsAt)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  
    listingContainer.innerHTML = listingHTML;

    if (bids.length > 0) {
      bids.forEach((bid) => {
        const bidHTML = `
          <div>
            <img src="${bid.bidder.avatar.url}" alt="${bid.bidder.avatar.alt || 'Bidder avatar'}">
            <div>
              <div>
                <h3>${bid.bidder.name}</h3>
              </div>
              <div>
                <span>${bid.amount} credits</span>
                <span>${formatDate(bid.created)}</span>
              </div>
            </div>
          </div>
        `;
        bidsContainer.innerHTML += bidHTML;
      });
    } else {
      bidsContainer.innerHTML = `<p>No bids yet.</p>`;
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
  