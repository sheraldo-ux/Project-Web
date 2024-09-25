import React, { useRef } from 'react';

const TipSection = React.forwardRef(({ title, tips }, ref) => (
  <div ref={ref} className="bg-gray-100 rounded-lg p-4 mb-6">
    <h2 className="text-xl font-bold text-teal-700 mb-2">{title}</h2>
    <ul className="list-disc pl-5">
      {tips.map((tip, index) => (
        <li key={index} className="mb-1">{tip}</li>
      ))}
    </ul>
  </div>
));

export const FloodSafetyTipsPage = () => {
  const tipSections = [
    {
      title: "Flood Preparedness Checklist",
      tips: [
        "Create an emergency kit with essentials for at least 72 hours",
        "Develop a family communication plan",
        "Know your evacuation routes and have a plan for pets",
        "Keep important documents in a waterproof container",
        "Install check valves in plumbing to prevent backups"
      ]
    },
    {
      title: "Emergency Kit Recommendations",
      tips: [
        "Water (one gallon per person per day for at least three days)",
        "Non-perishable food and a manual can opener",
        "Battery-powered or hand crank radio and extra batteries",
        "Flashlight and extra batteries",
        "First aid kit and whistle to signal for help",
        "Moist towelettes, garbage bags, and plastic ties for personal sanitation",
        "Cell phone with chargers and backup battery"
      ]
    },
    {
      title: "Before a Flood",
      tips: [
        "Stay informed: Monitor weather forecasts and flood warnings",
        "Prepare your home: Move valuables to higher ground",
        "Charge electronic devices and backup important data",
        "Fill clean water containers for drinking water",
        "Fill your vehicle's gas tank in case of evacuation"
      ]
    },
    {
      title: "During a Flood",
      tips: [
        "Stay out of floodwaters: As little as 6 inches of water can knock you down",
        "Avoid driving through flooded areas: 12 inches of water can float most vehicles",
        "Move to higher ground if flash flooding occurs",
        "Follow evacuation orders immediately if given",
        "Turn off utilities at the main switches if instructed to do so"
      ]
    },
    {
      title: "After a Flood",
      tips: [
        "Return home only when authorities say it's safe",
        "Avoid walking or driving through flood waters",
        "Be aware of areas where floodwaters have receded and watch for debris",
        "Stay clear of downed power lines and report them to the power company",
        "Clean and disinfect everything that got wet",
        "Take pictures of damage for insurance claims"
      ]
    },
    {
      title: "Protecting Your Property",
      tips: [
        "Elevate the furnace, water heater, and electric panel if susceptible to flooding",
        "Install \"check valves\" to prevent flood water from backing up into drains",
        "Waterproof basement walls and floors",
        "Consider installing a sump pump system with battery backup",
        "Clear debris from gutters and downspouts"
      ]
    }
  ];

  const sectionRefs = tipSections.map(() => useRef(null));

  const scrollToSection = (index) => {
    sectionRefs[index].current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    
    <div className="max-w-3xl mx-auto p-6">
        
      <h1 className="text-3xl font-bold text-teal-800 mb-6">Flood Safety Tips</h1>
      
      <nav className="mb-8">
        <ul className="flex flex-wrap gap-2">
          {tipSections.map((section, index) => (
            <li key={index}>
              <button 
                onClick={() => scrollToSection(index)}
                className="text-sm bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 transition-colors"
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {tipSections.map((section, index) => (
        <TipSection key={index} ref={sectionRefs[index]} title={section.title} tips={section.tips} />
      ))}

      <p className="mt-6 text-gray-700">
        Remember, your safety is paramount. Always follow instructions from local authorities and evacuate if told to do so.
      </p>
    </div>
  );
};

export default FloodSafetyTipsPage;