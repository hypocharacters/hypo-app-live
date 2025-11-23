// --- Configuration ---
const FORM_SUBMIT_EMAIL = "hypocharacters@icloud.com"; 
        
// --- Card Data Structure (The Rugby Series) ---
const CARDS = [
    { id: 101, name: "Abraham - Front Pose", type: "Character", rarity: "Common", img: "master-basketball-01.png" },
    { id: 102, name: "Betty - Front Pose", type: "Character", rarity: "Common", img: "master-basketball-01.png" }, 
    { id: 103, name: "Clarence - Front Pose", type: "Character", rarity: "Common", img: "master-basketball-01.png" }, 
    { id: 104, name: "Dolores - Front Pose", type: "Character", rarity: "Common", img: "master-basketball-01.png" },
    { id: 201, name: "Abraham - Action Pose I", type: "Action", rarity: "Uncommon", img: "master-rugby-01.png" }, 
    { id: 202, name: "Betty - Action Pose I", type: "Action", rarity: "Uncommon", img: "master-rugby-01.png" }, 
    { id: 301, name: "Rugby Jersey (Red)", type: "Clothing", rarity: "Common", img: "master-rugby-01.png" }, 
    { id: 302, name: "Rugby Shorts (White)", type: "Clothing", rarity: "Common", img: "master-rugby-01.png" }, 
    { id: 303, name: "Blank Uniform Card", type: "Utility", rarity: "Rare", img: "master-rugby-01.png" }, 
    { id: 401, name: "Golden Rugby Ball", type: "Item", rarity: "Rare", img: "master-rugby-01.png" },
    { id: 402, name: "Team Bus Concept", type: "Item", rarity: "Rare", img: "master-rugby-01.png" },
    { id: 501, name: "The Collector's Vault Key", type: "Reward", rarity: "Legendary", img: "master-rugby-01.png" }
];

// --- Card Album Logic ---
function openPack() {
    const cardDisplay = document.getElementById('card-results');
    if (!cardDisplay) return;
    
    cardDisplay.innerHTML = '<h3>Opening Pack...</h3>';
    const packSize = 3;
    const openedCards = [];
    
    for (let i = 0; i < packSize; i++) {
        const randomIndex = Math.floor(Math.random() * CARDS.length);
        openedCards.push(CARDS[randomIndex]);
    }

    setTimeout(() => {
        let resultsHTML = '<h3>🏆 You Opened:</h3><ul style="list-style-type: none; padding: 0; margin: 10px auto; max-width: 300px;">';
        openedCards.forEach(card => {
            resultsHTML += `<li class="rarity-${card.rarity}">${card.name} (${card.rarity})</li>`;
        });
        resultsHTML += '</ul>';
        cardDisplay.innerHTML = resultsHTML;

        const clothingCard = openedCards.find(c => c.type === 'Clothing');
        if (clothingCard) {
            console.log(`Item Unlocked: ${clothingCard.name}`);
        }
    }, 1000);
}


// --- Form Submission Logic ---
function submitForm(data) {
    const FORM_SUBMIT_EMAIL = "hypocharacters@icloud.com"; 
    const url = `https://formsubmit.co/ajax/${FORM_SUBMIT_EMAIL}`; 
    
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const customForm = document.getElementById('custom-request-form');
        const customModal = document.getElementById('custom-modal');
        if (data.success) {
            alert("✅ Success! Your request has been sent. We will contact you soon with a quote.");
        } else {
            alert("❌ Submission Failed. Please try again.");
        }
        if (customForm) customForm.reset();
        if (customModal) customModal.style.display = 'none';
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        alert("❌ An error occurred during submission. Please check your internet connection.");
        const customModal = document.getElementById('custom-modal');
        if (customModal) customModal.style.display = 'none';
    });
}


// --- Main Initialization Function (Ensures all elements exist before adding listeners) ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Setup
    const tabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.app-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.style.display = 'none');
            tab.classList.add('active');
            document.getElementById(targetId).style.display = 'block';
        });
    });

    // 2. Wardrobe Setup
    document.querySelectorAll('.color-selector button').forEach(button => {
        button.addEventListener('click', () => {
            const layerId = button.getAttribute('data-layer');
            const color = button.getAttribute('data-color');
            const layerElement = document.getElementById(layerId);
            if (color === 'none') {
                layerElement.style.display = 'none';
            } else {
                layerElement.style.display = 'block';
                layerElement.style.backgroundColor = color;
            }
        });
    });

    const downloadMockup = document.getElementById('download-mockup');
    if (downloadMockup) {
        downloadMockup.addEventListener('click', () => {
            alert("The full image saving feature requires the final layered PNG assets from your freelancer. This button is a placeholder for the 'Save' feature!");
        });
    }


    // 3. Card Album Setup
    const packButton = document.getElementById('open-pack-btn');
    if (packButton) {
        packButton.addEventListener('click', openPack);
    }
    
    // 4. Modal and Form Setup
    const customModal = document.getElementById('custom-modal');
    const closeCustomModalBtn = document.getElementById('close-custom-modal-btn');
    const customForm = document.getElementById('custom-request-form');
    const shopCustomBtn = document.getElementById('shop-custom-btn');
    
    if (shopCustomBtn) {
        shopCustomBtn.addEventListener('click', () => {
            customModal.style.display = 'flex';
        });
    }

    if (closeCustomModalBtn) {
        closeCustomModalBtn.addEventListener('click', () => {
            customModal.style.display = 'none';
        });
    }

    if (customModal) {
        customModal.addEventListener('click', (event) => {
            if (event.target === customModal) {
                customModal.style.display = 'none';
            }
        });
    }

    if (customForm) {
        customForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            
            const name = document.getElementById('custom-name').value;
            const email = document.getElementById('custom-email').value;
            const details = document.getElementById('custom-details').value;

            const submissionData = {
                "_subject": "NEW Custom Character Request (NZ App)", 
                "Customer Name": name,
                "Customer Email": email, 
                "Request Details": details,
                "Source": "Hypo Characters MVP - Shop Commission"
            };

            submitForm(submissionData);
        });
    }
});