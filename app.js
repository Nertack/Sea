const TROOP_DATA = {
    t12: {
        name: "Exalted",
        fc9: {
            inf: { atk: 21, def: 30, hp: 29, leth: 20 },
            lan: { atk: 30, def: 22, hp: 21, leth: 28 },
            mar: { atk: 31, def: 22, hp: 21, leth: 29 }
        },
        fc10: {
            inf: { atk: 22, def: 31, hp: 30, leth: 21 },
            lan: { atk: 31, def: 24, hp: 23, leth: 29 },
            mar: { atk: 33, def: 24, hp: 23, leth: 30 }
        }
    },
    t11: {
        name: "Helios",
        fc9: {
            inf: { atk: 18, def: 27, hp: 26, leth: 17 },
            lan: { atk: 27, def: 19, hp: 18, leth: 25 },
            mar: { atk: 28, def: 19, hp: 18, leth: 26 }
        },
        fc10: {
            inf: { atk: 19, def: 28, hp: 27, leth: 18 },
            lan: { atk: 28, def: 21, hp: 20, leth: 26 },
            mar: { atk: 30, def: 21, hp: 20, leth: 27 }
        }
    },
    t10: {
        name: "Apex",
        fc9: {
            inf: { atk: 16, def: 25, hp: 24, leth: 15 },
            lan: { atk: 25, def: 17, hp: 16, leth: 23 },
            mar: { atk: 26, def: 17, hp: 16, leth: 24 }
        },
        fc10: {
            inf: { atk: 18, def: 26, hp: 25, leth: 16 },
            lan: { atk: 26, def: 19, hp: 17, leth: 24 },
            mar: { atk: 27, def: 19, hp: 17, leth: 25 }
        }
    }
};
const TROOP_SKILLS = {

    master_brawler: { type: "dmg_up_vs", value: 0.10, target: "lan", desc: "Master Brawler: +10% dmg to Lancers" },
    bands_of_steel: { type: "def_up_vs", value: 0.10, target: "lan", desc: "Bands of Steel: +10% def vs Lancers" },
    crystal_shield: { type: "flat_block", value: 36, chance: 0.375, target: "all", desc: "Crystal Shield: 37.5% chance to block 36 dmg" },
    body_of_light_fc9:  { type: "conditional_def", value: 0.04, extra: 0.10, target: "inf", desc: "Body of Light (FC9): +4% Def, -10% dmg when Shield active" },
    body_of_light_fc10: { type: "conditional_def", value: 0.06, extra: 0.15, target: "inf", desc: "Body of Light (FC10): +6% Def, -15% dmg when Shield active" },


    charge: { type: "dmg_up_vs", value: 0.10, target: "mar", desc: "Charge: +10% dmg to Marksman" },
    ambusher: { type: "bypass_chance", value: 0.20, target: "mar", desc: "Ambusher: 20% chance to strike Marksman behind Infantry" },
    crystal_lance: { type: "double_damage_chance", value: 0.15, target: "all", desc: "Crystal Lance: 15% chance of double damage" },
    incandescent_field_fc9:  { type: "half_dmg_chance", value: 0.10, target: "all", desc: "Incandescent Field (FC9): 10% chance to take half damage" },
    incandescent_field_fc10: { type: "half_dmg_chance", value: 0.15, target: "all", desc: "Incandescent Field (FC10): 15% chance to take half damage" },


    ranged_strike: { type: "dmg_up_vs", value: 0.10, target: "inf", desc: "Ranged Strike: +10% dmg to Infantry" },
    volley: { type: "double_attack_chance", value: 0.10, target: "all", desc: "Volley: 10% chance to strike twice" },
    crystal_gunpowder: { type: "crit_chance", value: 0.30, critDmg: 0.50, target: "all", desc: "Crystal Gunpowder: 30% chance +50% dmg" },
    flame_charge_fc9:  { type: "conditional_atk", value: 0.04, extra: 0.25, target: "mar", desc: "Flame Charge (FC9): +4% Atk, +25% dmg when Gunpowder active" },
    flame_charge_fc10: { type: "conditional_atk", value: 0.06, extra: 0.375, target: "mar", desc: "Flame Charge (FC10): +6% Atk, +37.5% dmg when Gunpowder active" }
};

const TROOP_SKILLS_BY_TIER = {
    t12: {
        fc9:  ["master_brawler","bands_of_steel","charge","ambusher","ranged_strike","volley",
            "crystal_shield","body_of_light_fc9","crystal_lance","incandescent_field_fc9","crystal_gunpowder","flame_charge_fc9"],
        fc10: ["master_brawler","bands_of_steel","charge","ambusher","ranged_strike","volley",
            "crystal_shield","body_of_light_fc10","crystal_lance","incandescent_field_fc10","crystal_gunpowder","flame_charge_fc10"]
    },
    t11: {
        fc9:  ["master_brawler","bands_of_steel","charge","ambusher","ranged_strike","volley",
            "crystal_shield","body_of_light_fc9","crystal_lance","incandescent_field_fc9","crystal_gunpowder","flame_charge_fc9"],
        fc10: ["master_brawler","bands_of_steel","charge","ambusher","ranged_strike","volley",
            "crystal_shield","body_of_light_fc10","crystal_lance","incandescent_field_fc10","crystal_gunpowder","flame_charge_fc10"]
    },
    t10: {
        fc9:  ["master_brawler","bands_of_steel","charge","ambusher","ranged_strike","volley",
            "crystal_shield","body_of_light_fc9","crystal_lance","incandescent_field_fc9","crystal_gunpowder","flame_charge_fc9"],
        fc10: ["master_brawler","bands_of_steel","charge","ambusher","ranged_strike","volley",
            "crystal_shield","body_of_light_fc10","crystal_lance","incandescent_field_fc10","crystal_gunpowder","flame_charge_fc10"]
    }
};

function getTroopSkillsForType(tier, fc) {
    const keys = TROOP_SKILLS_BY_TIER[tier]?.[fc] || [];
    return keys.map(k => TROOP_SKILLS[k]).filter(Boolean);
}


const T12_RALLY_SKILLS = {
    indomitable_wall: {
        type: "enemy_dmg_down",
        value: 0.018,
        target: "all",
        duration: 5,
        desc: "Indomitable Wall: -1.8% enemy damage for 5 turns (up to 8 rally members)"
    },
    meridian_phalanx: {
        type: "composite",
        effects: [
            { type: "dmg_taken_down", value: 0.03, target: "inf", desc: "-3% Infantry damage received" },
            { type: "dmg_dealt_up", value: 0.03, target: "mar", desc: "+3% Marksman damage dealt" }
        ],
        duration: 5,
        desc: "Meridian Phalanx: -3% Inf dmg taken, +3% Mar dmg dealt for 5 turns (up to 8 rally members)"
    },
    starfire: {
        type: "dmg_up_stack",
        value: 0.015,
        target: "mar",
        procEvery: 5,
        stackable: true,
        desc: "Starfire: +1.5% Marksman damage every 5 turns, stackable (up to 8 rally members)"
    }
};



function updateTroopStats(side, troopType) {
    troopType = troopType || null;
    const types = troopType ? [troopType] : ['inf', 'lan', 'mar'];

    for (let tt of types) {
        const tier = document.getElementById(side + '-' + tt + '-tier')?.value || 't12';
        const fc = document.getElementById(side + '-' + tt + '-fc')?.value || 'fc10';
        const data = TROOP_DATA[tier]?.[fc];
        if (!data) continue;

        const stats = ['atk', 'def', 'hp', 'leth'];
        for (let st of stats) {
            const el = document.getElementById(side + '-base-' + tt + '-' + st);
            if (el) el.value = data[tt][st];
        }
        const disp = document.getElementById(side + '-display-' + tt);
        if (disp) {
            disp.textContent = data[tt].atk + ' / ' + data[tt].def + ' / ' + data[tt].hp + ' / ' + data[tt].leth;
        }
    }
}

const HEROES = {
    magnus: {
        name: "Magnus", gen: "S9", class: "inf", rarity: "legendary",
        skills: [
            { type: "atk_up", value: 0.25, target: "all", slot: "A", desc: "Attack Up +25%", chance: 1.0 },
            { type: "def_up", value: 0.50, target: "inf", slot: "I", desc: "Defense Up +50% (Inf)", chance: 0.40 },
            { type: "dmg_taken_down", value: 0.10, target: "inf", slot: "I", desc: "Damage Taken Down 10% (Inf)", chance: 1.0 },
            { type: "dmg_up", value: 0.10, target: "mar", slot: "M", desc: "Damage Up +10% (Mar)", chance: 1.0 },
        ]
    },
    fred: {
        name: "Fred", gen: "S9", class: "lan", rarity: "legendary",
        skills: [
            { type: "enemy_leth_down", value: 0.20, target: "all", slot: "A", desc: "Enemy Lethality Down 20%", chance: 1.0 },
            { type: "enemy_dmg_taken_up", value: 0.20, target: "all", slot: "A", desc: "Enemy Damage Taken Up +20%", chance: 1.0 },
            { type: "dmg_dealt_up", value: 2.00, target: "lan", slot: "L", desc: "Damage Dealt Up +200% (Lan)", chance: 1.0, procEvery: 4 },
            { type: "enemy_dmg_down", value: 0.20, target: "all", slot: "A", desc: "Enemy Damage Down 20% (next turn)", chance: 1.0, procEvery: 4 },
        ]
    },
    xura: {
        name: "Xura", gen: "S9", class: "mar", rarity: "legendary",
        skills: [
            { type: "dmg_taken_down", value: 0.20, target: "all", slot: "A", desc: "Damage Taken Down 20%", chance: 1.0 },
            { type: "dmg_up", value: 1.00, target: "mar", slot: "M", desc: "Damage Up +100% (Mar)", chance: 1.0, procEvery: 2 },
            { type: "enemy_dmg_taken_up", value: 0.25, target: "all", slot: "A", desc: "Enemy Damage Taken Up +25% (1 turn)", chance: 1.0, procEvery: 2 },
            { type: "dmg_dealt_up", value: 0.10, target: "mar", slot: "M", desc: "Damage Dealt Up +10% (Mar)", chance: 1.0 },
            { type: "dmg_taken_down", value: 0.15, target: "mar", slot: "M", desc: "Damage Taken Down 15% (Mar)", chance: 1.0 },
        ]
    },
    gatot: {
        name: "Gatot", gen: "S8", class: "inf", rarity: "legendary",
        skills: [
            { type: "def_up", value: 0.30, target: "inf", slot: "I", desc: "Defense Up +30% (Inf)", chance: 1.0 },
            { type: "shield", value: 0.30, target: "inf", slot: "I", desc: "Shield +30% Attack (Inf)", chance: 0.30 },
            { type: "enemy_atk_down", value: 0.25, target: "all", slot: "A", desc: "Enemy Attack Down 25%", chance: 1.0 },
        ]
    },
    sonya: {
        name: "Sonya", gen: "S8", class: "lan", rarity: "legendary",
        skills: [
            { type: "dmg_up", value: 0.20, target: "all", slot: "A", desc: "Damage Up +20%", chance: 1.0 },
            { type: "atk_up", value: 0.25, target: "all", slot: "A", desc: "Attack Up +25% (1 turn)", chance: 1.0, procEvery: 2 },
            { type: "dmg_up", value: 0.75, target: "lan", slot: "L", desc: "Damage Up +75% (Lan)", chance: 1.0, procEvery: 2 },
            { type: "dmg_up", value: 2.50, target: "lan", slot: "L", desc: "Damage Up +250% (Lan)", chance: 1.0, procEvery: 5 },
        ]
    },
    hendrik: {
        name: "Hendrik", gen: "S8", class: "mar", rarity: "legendary",
        skills: [
            { type: "enemy_def_down", value: 0.25, target: "all", slot: "A", desc: "Enemy Defense Down 25%", chance: 1.0 },
            { type: "def_up", value: 0.30, target: "all", slot: "A", desc: "Defense Up +30% (2 turns)", chance: 1.0, procEvery: 4, duration: 2 },
            { type: "dmg_up", value: 0.40, target: "mar", slot: "M", desc: "Damage Up +40% (Mar)", chance: 1.0, procEvery: 3 },
        ]
    },
    edith: {
        name: "Edith", gen: "S7", class: "inf", rarity: "legendary",
        skills: [
            { type: "dmg_taken_down", value: 0.20, target: "mar", slot: "M", desc: "Damage Taken Down 20% (Mar)", chance: 1.0 },
            { type: "dmg_dealt_up", value: 0.20, target: "lan", slot: "L", desc: "Damage Dealt Up +20% (Lan)", chance: 1.0 },
            { type: "dmg_taken_down", value: 0.20, target: "inf", slot: "I", desc: "Damage Taken Down 20% (Inf)", chance: 1.0 },
            { type: "hp_up", value: 0.25, target: "all", slot: "A", desc: "Health Up +25%", chance: 1.0 },
        ]
    },
    gordon: {
        name: "Gordon", gen: "S7", class: "lan", rarity: "legendary",
        skills: [
            { type: "dmg_up", value: 1.00, target: "lan", slot: "L", desc: "Damage Up +100% (Lan)", chance: 1.0, procEvery: 2 },
            { type: "enemy_dmg_down", value: 0.20, target: "all", slot: "A", desc: "Enemy Damage Down 20%", chance: 1.0, procEvery: 2 },
            { type: "dmg_dealt_up", value: 1.50, target: "lan", slot: "L", desc: "Damage Dealt Up +150% (Lan)", chance: 1.0, procEvery: 3 },
            { type: "enemy_dmg_down", value: 0.30, target: "all", slot: "A", desc: "Enemy Damage Down 30% (1 turn)", chance: 1.0, procEvery: 3 },
            { type: "enemy_dmg_taken_up", value: 0.30, target: "inf", slot: "A", desc: "Enemy Damage Taken Up +30% (Inf, 2 turns)", chance: 1.0, procEvery: 4, duration: 2 },
        ]
    },
    bradley: {
        name: "Bradley", gen: "S7", class: "mar", rarity: "legendary",
        skills: [
            { type: "atk_up", value: 0.25, target: "all", slot: "A", desc: "Attack Up +25%", chance: 1.0 },
            { type: "dmg_dealt_up", value: 0.25, target: "inf", slot: "A", desc: "Damage Dealt Up +25% (Inf)", chance: 1.0 },
            { type: "dmg_dealt_up", value: 0.30, target: "lan", slot: "A", desc: "Damage Dealt Up +30% (Lan)", chance: 1.0 },
            { type: "dmg_dealt_up", value: 0.30, target: "all", slot: "A", desc: "Damage Dealt Up +30% (2 turns)", chance: 1.0, procEvery: 4, duration: 2 },
        ]
    },
    wu_ming: {
        name: "Wu Ming", gen: "S6", class: "inf", rarity: "legendary",
        skills: [
            { type: "dmg_taken_down", value: 0.25, target: "inf", slot: "I", desc: "Damage Taken Down 25% (Normal, Inf)", chance: 1.0 },
            { type: "dmg_taken_down", value: 0.30, target: "inf", slot: "I", desc: "Damage Taken Down 30% (Skill, Inf)", chance: 1.0 },
            { type: "dmg_dealt_up", value: 0.20, target: "all", slot: "A", desc: "Damage Dealt Up +20%", chance: 1.0 },
            { type: "dmg_dealt_up", value: 0.25, target: "all", slot: "A", desc: "Damage Dealt Up (Skill) +25%", chance: 1.0 },
        ]
    },
    renee: {
        name: "Renee", gen: "S6", class: "lan", rarity: "legendary",
        skills: [
            { type: "dmg_up", value: 2.00, target: "lan", slot: "L", desc: "Extra Damage Up +200% (Lan, next turn)", chance: 1.0, procEvery: 2 },
            { type: "dmg_dealt_up", value: 1.50, target: "lan", slot: "L", desc: "Damage Dealt Up +150% (Lan, marked)", chance: 1.0 },
            { type: "dmg_dealt_up", value: 0.75, target: "all", slot: "A", desc: "Damage Dealt Up +75% (marked)", chance: 1.0 },
        ]
    },
    wayne: {
        name: "Wayne", gen: "S6", class: "mar", rarity: "legendary",
        skills: [
            { type: "dmg_up", value: 1.00, target: "all", slot: "A", desc: "Damage Up +100%", chance: 1.0, procEvery: 4 },
            { type: "dmg_up", value: 0.40, target: "lan", slot: "M", desc: "Damage Up +40% (vs Lan)", chance: 1.0 },
            { type: "dmg_up", value: 0.20, target: "mar", slot: "M", desc: "Damage Up +20% (vs Mar)", chance: 1.0 },
        ]
    },
    hector: {
        name: "Hector", gen: "S5", class: "inf", rarity: "legendary",
        skills: [
            { type: "dmg_taken_down", value: 0.50, target: "all", slot: "A", desc: "Damage Taken Down 50%", chance: 0.40 },
            { type: "dmg_dealt_up", value: 2.00, target: "inf", slot: "I", desc: "Damage Dealt Up +200% (Inf, 10 attacks)", chance: 1.0 },
            { type: "dmg_dealt_up", value: 1.00, target: "mar", slot: "M", desc: "Damage Dealt Up +100% (Mar, 10 attacks)", chance: 1.0 },
            { type: "dmg_up", value: 2.00, target: "all", slot: "A", desc: "Damage Up +200%", chance: 0.25 },
        ]
    },
    norah: {
        name: "Norah", gen: "S5", class: "lan", rarity: "legendary",
        skills: [
            { type: "dmg_dealt_up", value: 0.15, target: "inf_mar", slot: "M", desc: "Damage Dealt Up +15% (Inf/Mar)", chance: 1.0 },
            { type: "dmg_taken_down", value: 0.15, target: "inf_mar", slot: "M", desc: "Damage Taken Down 15% (Inf/Mar)", chance: 1.0 },
            { type: "dmg_up", value: 1.00, target: "lan", slot: "L", desc: "Extra Damage Up +100% (Lan)", chance: 0.20 },
            { type: "dmg_dealt_up", value: 0.25, target: "all", slot: "A", desc: "Damage Dealt Up +25% (2 turns)", chance: 1.0, procEvery: 5, duration: 2 },
            { type: "dmg_taken_down", value: 0.25, target: "all", slot: "A", desc: "Damage Taken Down 25% (2 turns)", chance: 1.0, procEvery: 5, duration: 2 },
        ]
    },
    gwen: {
        name: "Gwen", gen: "S5", class: "mar", rarity: "legendary",
        skills: [
            { type: "enemy_dmg_taken_up", value: 0.25, target: "all", slot: "A", desc: "Enemy Damage Taken Up +25%", chance: 1.0 },
            { type: "dmg_up", value: 1.00, target: "all", slot: "A", desc: "Extra Damage Up +100%", chance: 1.0, procEvery: 5 },
            { type: "enemy_dmg_taken_up", value: 0.15, target: "all", slot: "A", desc: "Enemy Damage Taken Up +15%", chance: 1.0, procEvery: 5 },
            { type: "dmg_up", value: 0.50, target: "mar", slot: "M", desc: "Extra Damage Up +50% (Mar)", chance: 1.0, procEvery: 4 },
        ]
    },
    ahmose: {
        name: "Ahmose", gen: "S4", class: "inf", rarity: "legendary",
        skills: [
            { type: "dmg_taken_down", value: 0.30, target: "lan_mar", slot: "A", desc: "Damage Taken Down 30% (Lan/Mar, 2 turns)", chance: 1.0, procEvery: 4, duration: 2 },
            { type: "dmg_taken_down", value: 0.70, target: "inf", slot: "I", desc: "Damage Taken Down 70% (Inf, 2 turns)", chance: 1.0, procEvery: 4, duration: 2 },
            { type: "dmg_dealt_up", value: 1.00, target: "inf", slot: "I", desc: "Damage Dealt Up +100% (Inf)", chance: 1.0 },
            { type: "dmg_dealt_up", value: 0.60, target: "inf", slot: "I", desc: "Damage Dealt Up +60% (Inf per attack)", chance: 1.0 },
            { type: "enemy_dmg_taken_up", value: 0.25, target: "inf", slot: "I", desc: "Enemy Damage Taken Up +25% (Inf, 1 turn)", chance: 1.0 },
        ]
    },
    reina: {
        name: "Reina", gen: "S4", class: "lan", rarity: "legendary",
        skills: [
            { type: "dmg_up", value: 0.30, target: "all", slot: "A", desc: "Damage Up +30% (Normal Attack)", chance: 1.0 },
            { type: "dodge_up", value: 0.20, target: "all", slot: "A", desc: "Dodge Rate Up 20%", chance: 0.20 },
            { type: "dmg_up", value: 2.00, target: "lan", slot: "L", desc: "Damage Up +200% (Lan)", chance: 0.25 },
        ]
    },
    lynn: {
        name: "Lynn", gen: "S4", class: "mar", rarity: "legendary",
        skills: [
            { type: "dmg_dealt_up", value: 0.50, target: "all", slot: "A", desc: "Damage Dealt Up +50%", chance: 0.40 },
            { type: "enemy_dmg_down", value: 0.20, target: "all", slot: "A", desc: "Enemy Damage Down 20%", chance: 1.0 },
            { type: "atk_up", value: 0.05, target: "mar", slot: "M", desc: "Attack Up +5% stackable (Mar)", chance: 1.0, procEvery: 3, stackable: true },
        ]
    },
    logan: {
        name: "Logan", gen: "S3", class: "inf", rarity: "legendary",
        skills: [
            { type: "enemy_atk_down", value: 0.20, target: "all", slot: "A", desc: "Enemy Attack Down 20%", chance: 1.0 },
            { type: "dmg_taken_down", value: 0.20, target: "all", slot: "A", desc: "Damage Taken Down 20%", chance: 1.0 },
            { type: "hp_up", value: 0.25, target: "all", slot: "A", desc: "Health Up +25%", chance: 1.0 },
        ]
    },
    mia: {
        name: "Mia", gen: "S3", class: "lan", rarity: "legendary",
        skills: [
            { type: "enemy_dmg_taken_up", value: 0.50, target: "all", slot: "A", desc: "Enemy Damage Taken Up +50%", chance: 0.50 },
            { type: "dmg_up", value: 0.50, target: "all", slot: "A", desc: "Damage Up +50%", chance: 0.50 },
            { type: "dmg_taken_down", value: 0.50, target: "all", slot: "A", desc: "Damage Taken Down 50%", chance: 0.40 },
        ]
    },
    greg: {
        name: "Greg", gen: "S3", class: "mar", rarity: "legendary",
        skills: [
            { type: "dmg_dealt_up", value: 0.40, target: "all", slot: "A", desc: "Damage Dealt Up +40% (3 turns)", chance: 0.20 },
            { type: "enemy_dmg_down", value: 0.50, target: "all", slot: "A", desc: "Enemy Damage Down 50% (2 turns)", chance: 0.20 },
            { type: "hp_up", value: 0.25, target: "all", slot: "A", desc: "Health Up +25%", chance: 1.0 },
        ]
    },
    flint: {
        name: "Flint", gen: "S2", class: "inf", rarity: "legendary",
        skills: [
            { type: "dmg_dealt_up", value: 1.00, target: "inf", slot: "I", desc: "Damage Dealt Up +100% (Inf)", chance: 1.0 },
            { type: "atk_up", value: 0.25, target: "all", slot: "A", desc: "Attack Up +25%", chance: 1.0 },
            { type: "leth_up", value: 0.25, target: "all", slot: "A", desc: "Lethality Up +25%", chance: 1.0 },
        ]
    },
    philly: {
        name: "Philly", gen: "S2", class: "lan", rarity: "legendary",
        skills: [
            { type: "atk_up", value: 0.15, target: "all", slot: "A", desc: "Attack Up +15%", chance: 1.0 },
            { type: "def_up", value: 0.10, target: "all", slot: "A", desc: "Defense Up +10%", chance: 1.0 },
            { type: "dmg_up", value: 2.00, target: "all", slot: "A", desc: "Damage Up +200%", chance: 0.25 },
            { type: "dmg_taken_down", value: 0.50, target: "all", slot: "A", desc: "Damage Taken Down 50%", chance: 0.40 },
        ]
    },
    alonso: {
        name: "Alonso", gen: "S2", class: "mar", rarity: "legendary",
        skills: [
            { type: "leth_up", value: 0.50, target: "all", slot: "A", desc: "Lethality Up +50%", chance: 0.40 },
            { type: "enemy_dmg_down", value: 0.50, target: "all", slot: "A", desc: "Enemy Damage Down 50% (2 turns)", chance: 0.20 },
            { type: "dmg_up", value: 0.50, target: "all", slot: "A", desc: "Damage Up +50%", chance: 0.50 },
        ]
    },
    jeronimo: {
        name: "Jeronimo", gen: "S1", class: "inf", rarity: "legendary",
        skills: [
            { type: "dmg_dealt_up", value: 0.25, target: "all", slot: "A", desc: "Damage Dealt Up +25%", chance: 1.0 },
            { type: "atk_up", value: 0.25, target: "all", slot: "A", desc: "Attack Up +25%", chance: 1.0 },
            { type: "dmg_dealt_up", value: 0.30, target: "all", slot: "A", desc: "Damage Dealt Up +30% (2 turns)", chance: 1.0, procEvery: 4, duration: 2 },
        ]
    },
    natalia: {
        name: "Natalia", gen: "S1", class: "inf", rarity: "legendary",
        skills: [
            { type: "dmg_taken_down", value: 0.50, target: "all", slot: "A", desc: "Damage Taken Down 50%", chance: 0.40 },
            { type: "atk_up", value: 0.25, target: "all", slot: "A", desc: "Attack Up +25%", chance: 1.0 },
            { type: "dmg_dealt_up", value: 0.25, target: "all", slot: "A", desc: "Damage Dealt Up +25%", chance: 1.0 },
        ]
    },
    sergey: {
        name: "Sergey", gen: "S1", class: "inf", rarity: "epic",
        skills: [
            { type: "dmg_taken_down", value: 0.20, target: "all", slot: "A", desc: "Damage Taken Down 20%", chance: 1.0 },
        ]
    },
    jessie: {
        name: "Jessie", gen: "S1", class: "lan", rarity: "epic",
        skills: [
            { type: "dmg_dealt_up", value: 0.25, target: "all", slot: "A", desc: "Damage Dealt Up +25%", chance: 1.0 },
        ]
    },
    ling_xue: {
        name: "Ling Xue", gen: "S1", class: "lan", rarity: "epic",
        skills: [
            { type: "enemy_atk_down", value: 0.20, target: "all", slot: "A", desc: "Enemy Attack Down 20%", chance: 1.0 },
        ]
    },
    lumak_bokan: {
        name: "Lumak Bokan", gen: "S1", class: "lan", rarity: "epic",
        skills: [
            { type: "enemy_dmg_down", value: 0.20, target: "all", slot: "A", desc: "Enemy Damage Down 20%", chance: 1.0 },
        ]
    },
    molly: {
        name: "Molly", gen: "S1", class: "lan", rarity: "legendary",
        skills: [
            { type: "dmg_taken_down", value: 0.50, target: "all", slot: "A", desc: "Damage Taken Down 50%", chance: 0.40 },
            { type: "dmg_dealt_up", value: 0.50, target: "all", slot: "A", desc: "Damage Dealt Up +50%", chance: 0.50 },
            { type: "dmg_dealt_up", value: 0.25, target: "all", slot: "A", desc: "Damage Dealt Up +25%", chance: 1.0 },
        ]
    },
    patrick: {
        name: "Patrick", gen: "S1", class: "lan", rarity: "epic",
        skills: [
            { type: "hp_up", value: 0.25, target: "all", slot: "A", desc: "Health Up +25%", chance: 1.0 },
        ]
    },
    bahiti: {
        name: "Bahiti", gen: "S1", class: "mar", rarity: "epic",
        skills: [
            { type: "dmg_taken_down", value: 0.20, target: "all", slot: "A", desc: "Damage Taken Down 20%", chance: 1.0 },
        ]
    },
    jasser: {
        name: "Jasser", gen: "S1", class: "mar", rarity: "epic",
        skills: [
            { type: "dmg_dealt_up", value: 0.25, target: "all", slot: "A", desc: "Damage Dealt Up +25%", chance: 1.0 },
        ]
    },
    seo_yoon: {
        name: "Seo-yoon", gen: "S1", class: "mar", rarity: "epic",
        skills: [
            { type: "atk_up", value: 0.25, target: "all", slot: "A", desc: "Attack Up +25%", chance: 1.0 },
        ]
    },
    zinman: {
        name: "Zinman", gen: "S1", class: "mar", rarity: "legendary",
        skills: [
            { type: "def_up", value: 0.10, target: "all", slot: "A", desc: "Defense Up +10%", chance: 1.0 },
            { type: "hp_up", value: 0.10, target: "all", slot: "A", desc: "Health Up +10%", chance: 1.0 },
            { type: "leth_up", value: 0.25, target: "all", slot: "A", desc: "Lethality Up +25%", chance: 1.0 },
        ]
    },
};

const JOINER_KEYS = [
    "none","jessie","patrick","norah","wu_ming","mia","hendrik","magnus",
    "fred","xura","gatot","sonya","edith","gordon","bradley","renee","wayne",
    "hector","gwen","ahmose","reina","lynn","logan","greg","flint","philly",
    "alonso","jeronimo","natalia","sergey","ling_xue","lumak_bokan","molly",
    "bahiti","jasser","seo_yoon","zinman"
];

const HERO_ORDER = [
    "magnus","fred","xura","gatot","sonya","hendrik","edith","gordon","bradley",
    "wu_ming","renee","wayne","hector","norah","gwen","ahmose","reina","lynn",
    "logan","mia","greg","flint","philly","alonso","jeronimo","natalia","sergey",
    "jessie","ling_xue","lumak_bokan","molly","patrick","bahiti","jasser","seo_yoon","zinman"
];


const state = {
    atk: { leaders: ["magnus","mia","hendrik"], joiners: ["none","none","none","none"] },
    def: { leaders: ["magnus","philly","xura"], joiners: ["none","none","none","none"] },
    modalTarget: null,
};


function getTag(slot) {
    const tags = { A: '<span class="skill-tag tag-a">A</span>', M: '<span class="skill-tag tag-m">M</span>', I: '<span class="skill-tag tag-i">I</span>', L: '<span class="skill-tag tag-l">L</span>' };
    return tags[slot] || '';
}

function getRarityClass(rarity) {
    return rarity || 'rare';
}

function renderHeroCard(key, selectedKey, onClick) {
    const h = HEROES[key];
    if (!h) return '';
    const sel = key === selectedKey ? 'selected' : '';
    const rar = getRarityClass(h.rarity);
    return '<div class="hero-card ' + h.class + ' ' + rar + ' ' + sel + '" data-key="' + key + '" onclick="' + onClick + '">' +
        '<div class="hero-portrait"><img src="images/' + key + '.png" class="hero-face" onerror="this.style.display=\'none\';this.parentNode.innerHTML=\'<div class=hero-initials>\'+h.name.substring(0,2)+\'</div>\';"></div>' +
        '<div class="hero-name">' + h.name + '</div>' +
        '<div class="hero-gen">' + h.gen + '</div>' +
        '<div class="hero-class-badge">' + h.class + '</div>' +
        '</div>';
}

function buildLeaderSlots() {
    for (const side of ['atk','def']) {
        const container = document.getElementById(side + '-leaders');
        let html = '';
        for (let i = 0; i < 3; i++) {
            const current = state[side].leaders[i];
            const h = HEROES[current];
            html += '<div class="slot-row">' +
                '<div class="slot-label">Leader ' + (i+1) + '</div>' +
                '<div class="slot-container">' +
                '<div class="slot-box filled ' + (h ? getRarityClass(h.rarity) : '') + '" onclick="openModal(\'' + side + '\',\'leader\',' + i + ')">' +
                (h ? '<div class="hero-portrait"><img src="images/' + current + '.png" class="hero-face" onerror="this.style.display=\'none\';this.parentNode.innerHTML=\'<div class=hero-initials>\'+h.name.substring(0,2)+\'</div>\';"></div><div style="font-size:13px;font-weight:600;color:#1A1A1A">' + h.name + '</div><div style="font-size:11px;color:#1A1A1A;font-weight:700">' + h.gen + '</div>' : '<span class="slot-plus">+</span>') +
                '</div>' +
                '</div>' +
                '</div>';
        }
        container.innerHTML = html;
    }
}

function buildJoinerSlots() {
    for (const side of ['atk','def']) {
        const container = document.getElementById(side + '-joiners');
        let html = '<div class="slot-row"><div class="slot-container" style="flex-wrap:wrap">';
        for (let i = 0; i < 4; i++) {
            const key = state[side].joiners[i];
            const h = HEROES[key];
            html += '<div class="slot-box ' + (key !== 'none' ? 'filled ' + getRarityClass(h?.rarity) : '') + '" onclick="openModal(\'' + side + '\',\'joiner\',' + i + ')">' +
                (h && key !== 'none' ? '<div class="hero-portrait"><img src="images/' + key + '.png" class="hero-face" onerror="this.style.display=\'none\';this.parentNode.innerHTML=\'<div class=hero-initials>\'+h.name.substring(0,2)+\'</div>\';"></div><div style="font-size:12px;font-weight:600;color:#1A1A1A">' + h.name + '</div>' : '<span class="slot-plus">+</span>') +
                '</div>';
        }
        html += '</div></div>';
        container.innerHTML = html;
    }
}

function openModal(side, type, index) {
    state.modalTarget = { side, type, index };
    const modal = document.getElementById('hero-modal');
    const title = document.getElementById('modal-title');
    const grid = document.getElementById('modal-grid');
    title.textContent = type === 'leader'
        ? 'Choose ' + (side === 'atk' ? 'attack' : 'defense') + ' leader (' + (index+1) + ')'
        : 'Choose ' + (side === 'atk' ? 'attack' : 'defense') + ' joiner (' + (index+1) + ')';
    let html = '';
    if (type === 'leader') {
        const groups = {};
        for (const key of HERO_ORDER) {
            const h = HEROES[key];
            if (!h) continue;
            if (!groups[h.gen]) groups[h.gen] = [];
            groups[h.gen].push(key);
        }
        const gens = Object.keys(groups).sort(function(a,b){ return parseInt(b.slice(1)) - parseInt(a.slice(1)); });
        for (const gen of gens) {
            var gridClass = gen === 'S1' ? 'hero-grid gen-grid-s1' : 'hero-grid gen-grid';
            html += '<div class="gen-section">';
            html += '<div class="gen-header">' + gen + '</div>';
            html += '<div class="' + gridClass + '">';
            for (const key of groups[gen]) {
                html += renderHeroCard(key, state[side].leaders[index], 'pickHero(\'' + key + '\')');
            }
            html += '</div></div>';
        }
    } else {
        html += '<div class="gen-section">';
        html += '<div class="gen-header">—</div>';
        html += '<div class="hero-grid gen-grid">';
        html += renderHeroCard('none', state[side].joiners[index], 'pickHero(\'none\')');
        html += '</div>';
        html += '</div>';
        const jGroups = {};
        for (const key of JOINER_KEYS) {
            if (key === 'none') continue;
            const h = HEROES[key];
            if (!h) continue;
            if (!jGroups[h.gen]) jGroups[h.gen] = [];
            jGroups[h.gen].push(key);
        }
        const jGens = Object.keys(jGroups).sort(function(a,b){ return parseInt(b.slice(1)) - parseInt(a.slice(1)); });
        for (const gen of jGens) {
            var jGridClass = gen === 'S1' ? 'hero-grid gen-grid-s1' : 'hero-grid gen-grid';
            html += '<div class="gen-section">';
            html += '<div class="gen-header">' + gen + '</div>';
            html += '<div class="' + jGridClass + '">';
            for (const key of jGroups[gen]) {
                html += renderHeroCard(key, state[side].joiners[index], 'pickHero(\'' + key + '\')');
            }
            html += '</div></div>';
        }
    }
    grid.innerHTML = html;
    modal.classList.add('open');
}

function closeModal() {
    document.getElementById('hero-modal').classList.remove('open');
    state.modalTarget = null;
}

function pickHero(key) {
    const t = state.modalTarget;
    if (!t) return;
    if (t.type === 'leader') {
        state[t.side].leaders[t.index] = key;
        buildLeaderSlots();
        updateLeaderSkills(t.side);
    } else {
        state[t.side].joiners[t.index] = key;
        buildJoinerSlots();
        updateJoinerSkills(t.side);
    }
    closeModal();
}

function formatSkill(s) {
    let extra = '';
    if (s.chance !== undefined && s.chance < 1.0) extra += '<span class="chance-badge">' + Math.round(s.chance*100) + '% chance</span>';
    if (s.procEvery) extra += '<span class="cooldown-badge">every ' + s.procEvery + ' turns</span>';
    if (s.duration) extra += '<span class="duration-badge">' + s.duration + ' turns</span>';
    return '• ' + s.desc + ' ' + getTag(s.slot) + extra;
}

function updateLeaderSkills(side) {
    let html = '<strong>Active leader skills:</strong><br>';
    for (let i = 0; i < 3; i++) {
        const h = HEROES[state[side].leaders[i]];
        if (!h) continue;
        html += '<div style="margin-top:6px;font-weight:600;color:#E4A499;">' + h.name + ' (' + h.gen + '):</div>';
        h.skills.forEach(s => { html += formatSkill(s) + '<br>'; });
    }
    document.getElementById(side + '-leader-skills').innerHTML = html;
}

function updateJoinerSkills(side) {
    let html = '<strong>Active joiner skills (1st skill only):</strong><br>';
    const stackMode = document.getElementById('stack-mode')?.value || 'no';
    const seen = new Set();
    for (let i = 0; i < 4; i++) {
        const key = state[side].joiners[i];
        if (!key || key === 'none' || !HEROES[key]) continue;
        if (stackMode !== 'yes' && seen.has(key)) continue;
        seen.add(key);
        const s = HEROES[key].skills[0];
        html += '• ' + HEROES[key].name + ': ' + formatSkill(s) + '<br>';
    }
    document.getElementById(side + '-joiner-skills').innerHTML = html;
}

function switchTab(name) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    var targetTab = null;
    if (typeof event !== 'undefined' && event && event.target) {
        targetTab = event.target;
    } else {
        var tabs = document.querySelectorAll('.tab');
        for (var i = 0; i < tabs.length; i++) {
            var oc = tabs[i].getAttribute('onclick');
            if (oc && oc.indexOf("'" + name + "'") !== -1) {
                targetTab = tabs[i];
                break;
            }
        }
    }
    if (targetTab) targetTab.classList.add('active');
    document.getElementById('tab-' + name).classList.add('active');
}

function getVal(id) {
    const el = document.getElementById(id);
    return el ? (parseFloat(el.value) || 0) : 0;
}


function getFrontline(troops) {
    if (troops.inf > 0) return 'inf';
    if (troops.lan > 0) return 'lan';
    return 'mar';
}

function getBaseStats(side) {
    var p = side + '-base-';
    return {
        inf: { atk: getVal(p + 'inf-atk'), def: getVal(p + 'inf-def'), hp: getVal(p + 'inf-hp'), leth: getVal(p + 'inf-leth') },
        lan: { atk: getVal(p + 'lan-atk'), def: getVal(p + 'lan-def'), hp: getVal(p + 'lan-hp'), leth: getVal(p + 'lan-leth') },
        mar: { atk: getVal(p + 'mar-atk'), def: getVal(p + 'mar-def'), hp: getVal(p + 'mar-hp'), leth: getVal(p + 'mar-leth') },
    };
}

function getTroops(cap, infPct, lanPct, marPct) {
    return {
        inf: Math.floor(cap * infPct / 100),
        lan: Math.floor(cap * lanPct / 100),
        mar: Math.floor(cap * marPct / 100),
    };
}

function calcStat(base, bonusPct, skillMultipliers) {
    let val = base * (1 + bonusPct / 100);
    for (let m of skillMultipliers) val *= m;
    return val;
}

function getSkillValue(s, mode) {
    if (mode === 'max') return s.value;
    if (mode === 'min') return 0;
    return s.value * (s.chance ?? 1.0);
}

function collectSideSkills(side, troopType, roundMode, round) {
    roundMode = roundMode || false;
    round = round || 0;
    const chanceMode = document.getElementById('chance-mode')?.value || 'expected';
    const skills = {
        atk_up: [], leth_up: [], def_up: [], hp_up: [],
        dmg_up: [], enemy_dmg_taken_up: [], dmg_dealt_up: [],
        dmg_taken_down: [], enemy_def_down: [],
        enemy_atk_down: [], enemy_leth_down: [], enemy_dmg_down: [],
        shield: []
    };


    const rallySkills = [];
    if (document.getElementById(side + '-indomitable-wall')?.checked) {
        rallySkills.push(T12_RALLY_SKILLS.indomitable_wall);
    }
    if (document.getElementById(side + '-meridian-phalanx')?.checked) {
        rallySkills.push(T12_RALLY_SKILLS.meridian_phalanx);
    }
    if (document.getElementById(side + '-starfire')?.checked) {
        rallySkills.push(T12_RALLY_SKILLS.starfire);
    }

    for (let rs of rallySkills) {
        if (rs.duration && round > rs.duration) continue;

        if (rs.type === "enemy_dmg_down") {
            if (rs.target === "all" || rs.target === troopType) {
                skills.enemy_dmg_down.push(rs.value);
            }
        } else if (rs.type === "composite") {
            for (let eff of rs.effects) {
                if (eff.target === "all" || eff.target === troopType) {
                    if (eff.type === "dmg_taken_down") skills.dmg_taken_down.push(eff.value);
                    if (eff.type === "dmg_dealt_up") skills.dmg_dealt_up.push(eff.value);
                }
            }
        } else if (rs.type === "dmg_up_stack") {
            if (rs.target === "all" || rs.target === troopType) {
                const stacks = Math.floor(round / rs.procEvery);
                skills.dmg_up.push(rs.value * stacks);
            }
        }
    }


    state[side].leaders.forEach(function(leaderKey) {
        const h = HEROES[leaderKey];
        if (!h) return;
        h.skills.forEach(function(s) {
            const applies = s.target === 'all' ||
                (s.target === 'inf' && troopType === 'inf') ||
                (s.target === 'lan' && troopType === 'lan') ||
                (s.target === 'mar' && troopType === 'mar') ||
                (s.target === 'inf_mar' && (troopType === 'inf' || troopType === 'mar')) ||
                (s.target === 'lan_mar' && (troopType === 'lan' || troopType === 'mar'));
            if (!applies) return;
            let val = s.value;
            if (!roundMode) {
                val = getSkillValue(s, chanceMode);
            } else {
                if (s.chance !== undefined && s.chance < 1.0) {
                    if (Math.random() >= s.chance) val = 0;
                }
                if (s.procEvery && s.procEvery > 0) {
                    if (round % s.procEvery !== 0) val = 0;
                }
            }
            if (val === 0) return;
            if (skills[s.type]) skills[s.type].push(val);
        });
    });


    const stackMode = document.getElementById('stack-mode')?.value || 'no';
    const dupMode = document.getElementById('jessie-mode')?.value || 'add';


    const joinerCounts = {};
    state[side].joiners.forEach(function(key) {
        if (!key || key === 'none') return;
        joinerCounts[key] = (joinerCounts[key] || 0) + 1;
    });

    Object.keys(joinerCounts).forEach(function(key) {
        let count = joinerCounts[key];
        if (stackMode !== 'yes') count = 1;

        const h = HEROES[key];
        if (!h || !h.skills[0]) return;
        const s = h.skills[0];
        const applies = s.target === 'all' ||
            (s.target === 'inf' && troopType === 'inf') ||
            (s.target === 'lan' && troopType === 'lan') ||
            (s.target === 'mar' && troopType === 'mar') ||
            (s.target === 'inf_mar' && (troopType === 'inf' || troopType === 'mar')) ||
            (s.target === 'lan_mar' && (troopType === 'lan' || troopType === 'mar'));
        if (!applies) return;

        let val = s.value;


        if (count > 1) {
            if (dupMode === 'add') val = val * count;
            else if (dupMode === 'mul') val = Math.pow(1 + val, count) - 1;

        }

        if (!roundMode) {
            val = val * (s.chance ?? 1.0);
        } else {
            if (s.chance !== undefined && s.chance < 1.0) {
                if (Math.random() >= s.chance) val = 0;
            }
            if (s.procEvery && s.procEvery > 0) {
                if (round % s.procEvery !== 0) val = 0;
            }
        }
        if (val === 0) return;
        if (skills[s.type]) skills[s.type].push(val);
    });

    return skills;
}

function calculateSideDamage(attackerSide, defenderSide, attackerTroops, defenderTroops, roundMode, round, forcedDefType) {
    roundMode = roundMode || false;
    round = round || 0;
    const attackerTotal = attackerTroops.inf + attackerTroops.lan + attackerTroops.mar;
    const defenderTotal = defenderTroops.inf + defenderTroops.lan + defenderTroops.mar;
    const minTotalSize = Math.min(attackerTotal, defenderTotal);
    const sqrtMinTotal = Math.sqrt(minTotalSize);

    const attackerBase = getBaseStats(attackerSide);
    const defenderBase = getBaseStats(defenderSide);

    const damageByType = {};

    for (let attType of ['inf', 'lan', 'mar']) {
        const t = attackerTroops[attType];
        if (t <= 0) {
            damageByType[attType] = { dmg: 0, bypass: 0, details: null };
            continue;
        }

        const effectiveSize = Math.sqrt(t) * sqrtMinTotal;

        const atkSkills = collectSideSkills(attackerSide, attType, roundMode, round);
        const defType = forcedDefType || attType;
        const defSkills = collectSideSkills(defenderSide, defType, roundMode, round);

        const attTier = document.getElementById(attackerSide + '-' + attType + '-tier')?.value || 't12';
        const attFc = document.getElementById(attackerSide + '-' + attType + '-fc')?.value || 'fc10';
        const attTroopSkills = getTroopSkillsForType(attTier, attFc);

        const defTier = document.getElementById(defenderSide + '-' + defType + '-tier')?.value || 't12';
        const defFc = document.getElementById(defenderSide + '-' + defType + '-fc')?.value || 'fc10';
        const defTroopSkills = getTroopSkillsForType(defTier, defFc);

        // Calculate attacker damage stat (ORIGINAL: multiply)
        const atkBonus = getVal(attackerSide + '-' + attType + '-atk-bonus');
        const lethBonus = getVal(attackerSide + '-' + attType + '-leth-bonus');
        let atkStat = attackerBase[attType].atk * (1 + atkBonus / 100);
        let lethStat = attackerBase[attType].leth * (1 + lethBonus / 100);

        atkSkills.atk_up.forEach(function(v) { atkStat *= (1 + v); });
        atkSkills.leth_up.forEach(function(v) { lethStat *= (1 + v); });

        attTroopSkills.forEach(function(s) {
            if (s.type === 'conditional_atk') atkStat *= (1 + s.value);
        });


        let damage = (atkStat * lethStat) / 100;


        let dmgBonus = 1.0;
        atkSkills.dmg_up.forEach(function(v) { dmgBonus *= (1 + v); });
        atkSkills.enemy_dmg_taken_up.forEach(function(v) { dmgBonus *= (1 + v); });
        atkSkills.dmg_dealt_up.forEach(function(v) { dmgBonus *= (1 + v); });


        let bypassChance = 0;
        attTroopSkills.forEach(function(s) {
            if (s.type === 'dmg_up_vs') dmgBonus *= (1 + s.value);
            if (s.type === 'double_damage_chance') {
                if (roundMode) { if (Math.random() < s.value) dmgBonus *= 2; }
                else { dmgBonus *= (1 + s.value); }
            }
            if (s.type === 'crit_chance') {
                if (roundMode) { if (Math.random() < s.value) dmgBonus *= (1 + s.critDmg); }
                else { dmgBonus *= (1 + s.value * s.critDmg); }
            }
            if (s.type === 'conditional_atk') {
                dmgBonus *= (1 + s.extra);
            }
            if (s.type === 'double_attack_chance') {
                if (roundMode) { if (Math.random() < s.value) dmgBonus *= 2; }
                else { dmgBonus *= (1 + s.value); }
            }
            if (s.type === 'bypass_chance') {
                if (roundMode) { if (Math.random() < s.value) bypassChance = 1; }
                else { bypassChance = s.value; }
            }
        });

        damage *= dmgBonus;


        const defBonus = getVal(defenderSide + '-' + defType + '-def-bonus');
        const hpBonus = getVal(defenderSide + '-' + defType + '-hp-bonus');
        let defStat = defenderBase[defType].def * (1 + defBonus / 100);
        let hpStat = defenderBase[defType].hp * (1 + hpBonus / 100);

        defSkills.def_up.forEach(function(v) { defStat *= (1 + v); });
        defSkills.hp_up.forEach(function(v) { hpStat *= (1 + v); });

        defTroopSkills.forEach(function(s) {
            if (s.type === 'def_up_vs') defStat *= (1 + s.value);
            if (s.type === 'conditional_def') defStat *= (1 + s.value);
        });


        let defense = (defStat * hpStat) / 100;


        let dmgReduction = 1.0;
        defSkills.dmg_taken_down.forEach(function(v) { dmgReduction *= (1 - v); });

        defTroopSkills.forEach(function(s) {
            if (s.type === 'half_dmg_chance') {
                dmgReduction *= (1 - s.value * 0.5);
            }
            if (s.type === 'conditional_def') {
                dmgReduction *= (1 - s.extra);
            }
        });


        if (atkSkills.enemy_def_down.length > 0) {
            defense *= Math.max(0.01, 1 - Math.max.apply(null, atkSkills.enemy_def_down));
        }

        // Final formula
        const roundPenalty = 1 - round * 0.0001;
        let kills = effectiveSize * (damage / defense) * dmgReduction * roundPenalty / 100;


        defTroopSkills.forEach(function(s) {
            if (s.type === 'flat_block') {
                kills = Math.max(0, kills - s.value * s.chance);
            }
        });

        kills = Math.ceil(kills);


        let bypassKills = 0;
        if (bypassChance > 0) {
            if (roundMode) { bypassKills = kills; }
            else { bypassKills = Math.round(kills * bypassChance); }
        }

        damageByType[attType] = {
            dmg: kills,
            bypass: bypassKills,
            details: {
                troops: t,
                effectiveSize: Math.round(effectiveSize),
                atk: Math.round(atkStat),
                leth: Math.round(lethStat),
                damage: Math.round(damage),
                defStat: Math.round(defStat),
                hpStat: Math.round(hpStat),
                defense: Math.round(defense),
                dmgBonus: dmgBonus.toFixed(3),
                dmgReduction: dmgReduction.toFixed(3),
                roundPenalty: roundPenalty.toFixed(4),
                kills: kills,
                bypass: bypassKills
            }
        };
    }

    return damageByType;
}

function calculate() {
    const atkTroops = getTroops(getVal('atk-cap'), getVal('atk-inf-pct'), getVal('atk-lan-pct'), getVal('atk-mar-pct'));
    const defTroops = getTroops(getVal('def-cap'), getVal('def-inf-pct'), getVal('def-lan-pct'), getVal('def-mar-pct'));
    const atkDmg = calculateSideDamage('atk', 'def', atkTroops, defTroops);
    const defDmg = calculateSideDamage('def', 'atk', defTroops, atkTroops);


    let atkTotalDmg = 0, defTotalDmg = 0;
    for (let tt of ['inf','lan','mar']) {
        atkTotalDmg += atkDmg[tt]?.dmg || 0;
        defTotalDmg += defDmg[tt]?.dmg || 0;
    }

    let html = '<div class="result-box">';
    html += '<div class="result-label">Attack damage potential</div>';
    html += '<div class="result-big">' + Math.round(atkTotalDmg).toLocaleString() + '</div>';
    html += '<div class="result-label">Defense damage potential</div>';
    html += '<div class="result-big">' + Math.round(defTotalDmg).toLocaleString() + '</div>';
    if (defTotalDmg > atkTotalDmg) {
        html += '<div class="winner winner-def"> DEFENSE STRONGER (' + (defTotalDmg / atkTotalDmg).toFixed(2) + 'x)</div>';
    } else {
        html += '<div class="winner winner-atk"> ATTACK STRONGER (' + (atkTotalDmg / defTotalDmg).toFixed(2) + 'x)</div>';
    }
    html += '</div>';

    html += '<h3>Troop type details</h3>';
    html += '<table><tr><th>Type</th><th>Troops</th><th>Eff.Size</th><th>Atk</th><th>Leth</th><th>Damage</th><th>Def</th><th>HP</th><th>Defense</th><th>DmgBonus</th><th>DmgRed</th><th>Kills</th></tr>';
    for (let tt of ['inf','lan','mar']) {
        const a = atkDmg[tt]?.details;
        if (a) {
            html += '<tr><td>' + tt.toUpperCase() + ' (attack)</td><td class="num">' + a.troops.toLocaleString() + '</td>';
            html += '<td class="num">' + a.effectiveSize.toLocaleString() + '</td>';
            html += '<td class="num">' + a.atk + '</td><td class="num">' + a.leth + '</td>';
            html += '<td class="num">' + a.damage + '</td>';
            html += '<td class="num">' + a.defStat + '</td><td class="num">' + a.hpStat + '</td>';
            html += '<td class="num">' + a.defense + '</td>';
            html += '<td class="num">' + a.dmgBonus + '</td><td class="num">' + a.dmgReduction + '</td>';
            html += '<td class="num">' + a.kills.toLocaleString() + '</td></tr>';
        }
    }
    for (let tt of ['inf','lan','mar']) {
        const d = defDmg[tt]?.details;
        if (d) {
            html += '<tr><td>' + tt.toUpperCase() + ' (defense)</td><td class="num">' + d.troops.toLocaleString() + '</td>';
            html += '<td class="num">' + d.effectiveSize.toLocaleString() + '</td>';
            html += '<td class="num">' + d.atk + '</td><td class="num">' + d.leth + '</td>';
            html += '<td class="num">' + d.damage + '</td>';
            html += '<td class="num">' + d.defStat + '</td><td class="num">' + d.hpStat + '</td>';
            html += '<td class="num">' + d.defense + '</td>';
            html += '<td class="num">' + d.dmgBonus + '</td><td class="num">' + d.dmgReduction + '</td>';
            html += '<td class="num">' + d.kills.toLocaleString() + '</td></tr>';
        }
    }
    html += '</table>';
    document.getElementById('result-content').innerHTML = html;
    switchTab('result');
}

function calculateRounds() {

    let atkTroops = getTroops(getVal('atk-cap'), getVal('atk-inf-pct'), getVal('atk-lan-pct'), getVal('atk-mar-pct'));
    let defTroops = getTroops(getVal('def-cap'), getVal('def-inf-pct'), getVal('def-lan-pct'), getVal('def-mar-pct'));

    let html = '<div class="result-box"><table class="round-table">';
    html += '<tr><th>Round</th><th class="num">Atk Inf</th><th class="num">Atk Lan</th><th class="num">Atk Mar</th><th class="num">Def Inf</th><th class="num">Def Lan</th><th class="num">Def Mar</th></tr>';
    let round = 0;
    let cumulativeAtkLoss = { inf: 0, lan: 0, mar: 0 };
    let cumulativeDefLoss = { inf: 0, lan: 0, mar: 0 };

    while ((atkTroops.inf + atkTroops.lan + atkTroops.mar) > 0 && (defTroops.inf + defTroops.lan + defTroops.mar) > 0 && round < 100) {
        round++;


        const defFront = getFrontline(defTroops);
        const atkFront = getFrontline(atkTroops);


        const atkDmg = calculateSideDamage('atk', 'def', atkTroops, defTroops, true, round, defFront);
        const defDmg = calculateSideDamage('def', 'atk', defTroops, atkTroops, true, round, atkFront);


        let defLosses = applyFrontlineDamage(defTroops, atkDmg);

        let atkLosses = applyFrontlineDamage(atkTroops, defDmg);


        for (let tt of ['inf', 'lan', 'mar']) {
            defTroops[tt] -= defLosses[tt];
            atkTroops[tt] -= atkLosses[tt];
            cumulativeDefLoss[tt] += defLosses[tt];
            cumulativeAtkLoss[tt] += atkLosses[tt];
        }

        html += '<tr><td>' + round + '</td>';
        html += '<td class="num">' + Math.round(atkTroops.inf + atkLosses.inf).toLocaleString() + '</td>';
        html += '<td class="num">' + Math.round(atkTroops.lan + atkLosses.lan).toLocaleString() + '</td>';
        html += '<td class="num">' + Math.round(atkTroops.mar + atkLosses.mar).toLocaleString() + '</td>';
        html += '<td class="num">' + Math.round(defTroops.inf + defLosses.inf).toLocaleString() + '</td>';
        html += '<td class="num">' + Math.round(defTroops.lan + defLosses.lan).toLocaleString() + '</td>';
        html += '<td class="num">' + Math.round(defTroops.mar + defLosses.mar).toLocaleString() + '</td></tr>';
    }
    html += '</table></div>';


    const totalAtkLoss = cumulativeAtkLoss.inf + cumulativeAtkLoss.lan + cumulativeAtkLoss.mar;
    const totalDefLoss = cumulativeDefLoss.inf + cumulativeDefLoss.lan + cumulativeDefLoss.mar;
    const totalAtkRem = atkTroops.inf + atkTroops.lan + atkTroops.mar;
    const totalDefRem = defTroops.inf + defTroops.lan + defTroops.mar;

    html += '<div class="result-box" style="margin-top:12px;">';
    html += '<div class="result-label">Battle result after ' + round + ' rounds</div>';
    html += '<div class="stats-grid">';
    html += '<div class="stat-card"><div class="val">' + Math.round(totalAtkLoss).toLocaleString() + '</div><div class="lbl">Attack losses</div></div>';
    html += '<div class="stat-card"><div class="val">' + Math.round(totalDefLoss).toLocaleString() + '</div><div class="lbl">Defense losses</div></div>';
    html += '<div class="stat-card"><div class="val">' + Math.round(totalAtkRem).toLocaleString() + '</div><div class="lbl">Attack remaining</div></div>';
    html += '<div class="stat-card"><div class="val">' + Math.round(totalDefRem).toLocaleString() + '</div><div class="lbl">Defense remaining</div></div>';
    html += '</div>';


    html += '<h3 style="margin-top:16px;">Losses by troop type</h3>';
    html += '<table><tr><th>Side</th><th>Infantry</th><th>Lancer</th><th>Marksman</th><th>Total</th></tr>';
    html += '<tr><td>Attack losses</td><td class="num">' + Math.round(cumulativeAtkLoss.inf).toLocaleString() + '</td>';
    html += '<td class="num">' + Math.round(cumulativeAtkLoss.lan).toLocaleString() + '</td>';
    html += '<td class="num">' + Math.round(cumulativeAtkLoss.mar).toLocaleString() + '</td>';
    html += '<td class="num">' + Math.round(totalAtkLoss).toLocaleString() + '</td></tr>';
    html += '<tr><td>Defense losses</td><td class="num">' + Math.round(cumulativeDefLoss.inf).toLocaleString() + '</td>';
    html += '<td class="num">' + Math.round(cumulativeDefLoss.lan).toLocaleString() + '</td>';
    html += '<td class="num">' + Math.round(cumulativeDefLoss.mar).toLocaleString() + '</td>';
    html += '<td class="num">' + Math.round(totalDefLoss).toLocaleString() + '</td></tr>';
    html += '</table>';

    if (totalAtkRem <= 0) {
        html += '<div class="winner winner-def"> DEFENSE WINS — attack destroyed</div>';
    } else if (totalDefRem <= 0) {
        html += '<div class="winner winner-atk"> ATTACK WINS — defense destroyed</div>';
    } else {
        html += '<div class="winner" style="background:rgba(188,123,111,0.15);color:#BC7B6F;">⏸ Battle not finished in 100 rounds</div>';
    }
    html += '</div>';
    document.getElementById('rounds-content').innerHTML = html;
    switchTab('rounds');
}

function applyFrontlineDamage(troops, damageByType) {
    const losses = { inf: 0, lan: 0, mar: 0 };
    let totalDmg = 0;
    let totalBypass = 0;
    for (let attType of ['inf', 'lan', 'mar']) {
        totalDmg += damageByType[attType]?.dmg || 0;
        totalBypass += damageByType[attType]?.bypass || 0;
    }

    let normalDmg = totalDmg - totalBypass;

    const infDmg = Math.min(normalDmg, troops.inf);
    losses.inf = infDmg;
    normalDmg -= infDmg;

    if (normalDmg > 0) {
        const lanDmg = Math.min(normalDmg, troops.lan);
        losses.lan = lanDmg;
        normalDmg -= lanDmg;
    }

    if (normalDmg > 0) {
        const marDmg = Math.min(normalDmg, troops.mar);
        losses.mar = marDmg;
    }

    const bypassMar = Math.min(totalBypass, Math.max(0, troops.mar - losses.mar));
    losses.mar += bypassMar;

    const remainingBypass = totalBypass - bypassMar;
    let bypassLan = 0;
    if (remainingBypass > 0) {
        bypassLan = Math.min(remainingBypass, Math.max(0, troops.lan - losses.lan));
        losses.lan += bypassLan;
    }

    const finalBypass = remainingBypass - bypassLan;
    if (finalBypass > 0) {
        const bypassInf = Math.min(finalBypass, Math.max(0, troops.inf - losses.inf));
        losses.inf += bypassInf;
    }

    return losses;
}



function saveState() {
    const data = {
        inputs: {},
        troop: {},
        heroes: {
            atk: { leaders: state.atk.leaders.slice(), joiners: state.atk.joiners.slice() },
            def: { leaders: state.def.leaders.slice(), joiners: state.def.joiners.slice() }
        },
        mechanics: {
            jessie: document.getElementById('jessie-mode')?.value || 'add',
            stack: document.getElementById('stack-mode')?.value || 'no',
            chance: document.getElementById('chance-mode')?.value || 'expected'
        }
    };
    document.querySelectorAll('input, select').forEach(function(el) {
        if (el.id) {
            if (el.type === 'checkbox') {
                data.inputs[el.id] = el.checked;
            } else {
                data.inputs[el.id] = el.value;
            }
        }
    });
    ['atk','def'].forEach(function(side) {
        data.troop[side] = {};
        ['inf','lan','mar'].forEach(function(tt) {
            var tierEl = document.getElementById(side + '-' + tt + '-tier');
            var fcEl = document.getElementById(side + '-' + tt + '-fc');
            data.troop[side][tt] = {
                tier: tierEl ? tierEl.value : 't12',
                fc: fcEl ? fcEl.value : 'fc10'
            };
        });
    });
    try { localStorage.setItem('wos_calc_v3', JSON.stringify(data)); } catch(e) {}
}

function loadState() {
    try {
        const raw = localStorage.getItem('wos_calc_v3');
        if (!raw) return;
        const data = JSON.parse(raw);
        if (data.troop) {
            ['atk','def'].forEach(function(side) {
                if (data.troop[side]) {
                    ['inf','lan','mar'].forEach(function(tt) {
                        var tData = data.troop[side][tt];
                        if (tData) {
                            var tierEl = document.getElementById(side + '-' + tt + '-tier');
                            var fcEl = document.getElementById(side + '-' + tt + '-fc');
                            if (tierEl && tData.tier) tierEl.value = tData.tier;
                            if (fcEl && tData.fc) fcEl.value = tData.fc;
                        }
                    });
                }
            });
        }
        if (data.inputs) {
            Object.keys(data.inputs).forEach(function(id) {
                const el = document.getElementById(id);
                if (!el) return;
                if (el.type === 'checkbox') {
                    el.checked = data.inputs[id];
                } else {
                    el.value = data.inputs[id];
                }
            });
        }
        if (data.heroes) {
            if (data.heroes.atk) {
                state.atk.leaders = data.heroes.atk.leaders || state.atk.leaders;
                state.atk.joiners = data.heroes.atk.joiners || state.atk.joiners;
            }
            if (data.heroes.def) {
                state.def.leaders = data.heroes.def.leaders || state.def.leaders;
                state.def.joiners = data.heroes.def.joiners || state.def.joiners;
            }
        }
        if (data.mechanics) {
            const jm = document.getElementById('jessie-mode');
            const sm = document.getElementById('stack-mode');
            const cm = document.getElementById('chance-mode');
            if (jm && data.mechanics.jessie) jm.value = data.mechanics.jessie;
            if (sm && data.mechanics.stack) sm.value = data.mechanics.stack;
            if (cm && data.mechanics.chance) cm.value = data.mechanics.chance;
        }
    } catch(e) {}
}

function bindAutoSave() {
    document.querySelectorAll('input, select').forEach(function(el) {
        el.addEventListener('change', saveState);
        el.addEventListener('input', saveState);
    });
}


var originalPickHero = pickHero;
pickHero = function(key) {
    originalPickHero(key);
    saveState();
};

document.addEventListener('DOMContentLoaded', function() {
    loadState();
    buildLeaderSlots();
    buildJoinerSlots();
    updateLeaderSkills('atk');
    updateLeaderSkills('def');
    updateJoinerSkills('atk');
    updateJoinerSkills('def');
    bindAutoSave();
    ['jessie-mode','stack-mode','chance-mode'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('change', function() {
            updateJoinerSkills('atk');
            updateJoinerSkills('def');
        });
    });
    ['atk','def'].forEach(function(side) {
        ['inf','lan','mar'].forEach(function(tt) {
            var tierEl = document.getElementById(side + '-' + tt + '-tier');
            var fcEl = document.getElementById(side + '-' + tt + '-fc');
            if (tierEl) tierEl.addEventListener('change', function() { updateTroopStats(side, tt); saveState(); });
            if (fcEl) fcEl.addEventListener('change', function() { updateTroopStats(side, tt); saveState(); });
        });
        updateTroopStats(side);
    });
});