const priceMap = {
    // Original
    "Paris Espresso": "price_1RRi8PDtRlajemAypU4F0YRA",
    "Vienna Lungo": "price_1RRhS3DtRlajemAyn21pjfVU",
    "Stockholm Lungo": "price_1RRi4EDtRlajemAySwy8ukJY",
    "Tokyo Lungo": "price_1RRi7gDtRlajemAy4yLAYZ8F",
    "Cape Town Lungo": "price_1RRi5LDtRlajemAykhs49GNX",
    "Shanghai Lungo": "price_1RRiPxDtRlajemAy65AzDwO9",

    // Vertuo
    "Paris Espresso Vertuo": "price_1RRiKfDtRlajemAyR1ofOc5N",
    "Vienna Lungo Vertuo": "price_1RRiMEDtRlajemAysbaSTnVe",
    "Stockholm Lungo Vertuo": "price_1RRiPJDtRlajemAyLoHrnWzU",
    "Tokyo Lungo Vertuo": "price_1RRiNKDtRlajemAyY8SycFWD",
    "Cape Town Lungo Vertuo": "price_1RRiO5DtRlajemAymuLnkIFj",
    "Shanghai Lungo Vertuo": "price_1RRiQfDtRlajemAyxrjwOYOW"
};

/**
 * Transforms capsule data by enriching each item with a price_id.
 *
 * @param {Array} capsules - List of capsule objects with at least `name` and `type`.
 * @returns {Array} Enriched capsules.
 */
export function transformCapsules(capsules) {
    return capsules.map(capsule => ({
        ...capsule,
        price_id: priceMap[ capsule.type === "Vertuo" ? `${capsule.name} Vertuo` : capsule.name ] || null
    }));
}
