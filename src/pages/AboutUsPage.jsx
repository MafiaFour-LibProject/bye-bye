import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-pink-50 text-pink-900 min-h-screen p-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-pink-600">About Us</h1>
        <p className="text-xl font-medium mb-8 text-gray-700">
          Welcome to{" "}
          <span className="font-bold text-pink-500">Bye-Bye Store</span> — where heartbreak turns into haute looks and glow-ups don’t break the bank.We are not just a fashion store. We are your post-breakup bestie, your budget-friendly stylist, and your hype squad rolled into one. Born from the idea that moving on should look fabulous, Bye-Bye Store is for the girl who’s done settling — in love and in fashion.
        </p>
        <p className="text-lg text-gray-600 mb-12">
          Bye-Bye Store is the passion project of four women in tech, combining
          beauty, brains, and budget-friendly brilliance. Together, we’ve built
          a stylish space that brings the glam without the guilt.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {[
          {
            name: "Linda",
            role: "Front-End Developer",
            img: "/public/Linda.jpg",
          },
          {
            name: "Victoria",
            role: "Front-End Developer",
            img: "/public/Me.jpg",
          },
          {
            name: "Christabel",
            role: "Back-End Developer",
            img: "/public/Christable.jpg",
          },
          {
            name: "Maame",
            role: "Back-End Developer",
            img: "/public/Maame.jpg",
          },
        ].map((founder) => (
          <div
            key={founder.name}
            className="bg-white rounded-lg shadow-md p-6 text-center"
          >
            <img
              src={founder.img}
              alt={founder.name}
              className="w-50 h-auto rounded mx-auto mb-4 border-4 object-cover  border-pink-200"
            />
            <h2 className="text-xl font-bold text-pink-600">{founder.name}</h2>
            <p className="text-sm text-gray-500">{founder.role}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Our Mission</h2>
        <p className="text-gray-700 text-lg">
         At Bye-Bye Store, our mission is to empower women to own their next chapter — stylishly, fearlessly, and affordably. We are here to prove that confidence doesn’t come with a price tag, and your fiercest glow-up should never wait on your wallet… or your ex.

This isn’t just fashion. It’s a farewell to the past — and a fire debut for what’s next. 💋
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
