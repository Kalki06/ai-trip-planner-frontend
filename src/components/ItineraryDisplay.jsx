// import { Card } from './ui/Card';
// import { MapPin, DollarSign, Clock, Calendar, Lightbulb, Backpack, Star, ExternalLink, Map } from 'lucide-react';

// export const ItineraryDisplay = ({ itinerary }) => {
//   if (!itinerary) return null;

//   return (
//     <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">

//       {/* Destination Header with Image */}
//       <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
//         <img 
//           src={itinerary.destinationImage || 'https://source.unsplash.com/1600x900/?travel,city'}
//           alt={itinerary.tripTitle}
//           className="w-full h-full object-cover"
//           onError={(e) => {
//             e.target.src = 'https://source.unsplash.com/1600x900/?travel,city';
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
//         <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//           <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">{itinerary.tripTitle}</h1>
//           <p className="text-xl text-gray-100 drop-shadow-md">{itinerary.overview}</p>
//         </div>
//       </div>

//       {/* Daily Plans */}
//       <div className="space-y-6">
//         <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
//           <Calendar className="text-blue-600" />
//           Day-by-Day Itinerary
//         </h2>

//         {itinerary.dailyPlan?.map((day) => (
//           <Card key={day.day} className="hover:shadow-2xl transition-shadow">
//             <div className="border-l-4 border-blue-600 pl-4 mb-6">
//               <h3 className="text-2xl font-bold text-gray-900">
//                 Day {day.day}: {day.title}
//               </h3>
//             </div>

//             {/* Hotels Section with Images */}
//             {day.hotels && day.hotels.length > 0 && (
//               <div className="mb-8">
//                 <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   🏨 Recommended Hotels
//                 </h4>
//                 <div className="grid md:grid-cols-2 gap-6">
//                   {day.hotels.map((hotel, idx) => (
//                     <div 
//                       key={idx}
//                       className="border-2 border-blue-100 rounded-xl overflow-hidden hover:border-blue-300 transition-all bg-white hover:shadow-xl group"
//                     >
//                       {/* Hotel Image */}
//                       <div className="relative h-48 overflow-hidden">
//                         <img 
//                           src={hotel.image}
//                           alt={hotel.name}
//                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                           onError={(e) => {
//                             e.target.src = 'https://source.unsplash.com/800x600/?hotel,luxury,room';
//                           }}
//                         />
//                         <div className="absolute top-3 right-3 flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
//                           <Star size={14} fill="white" />
//                           <span>{hotel.rating}</span>
//                         </div>
//                       </div>

//                       {/* Hotel Details */}
//                       <div className="p-4">
//                         <h5 className="font-bold text-lg text-gray-900 mb-2">{hotel.name}</h5>
//                         <p className="text-gray-700 text-sm mb-3 leading-relaxed line-clamp-2">{hotel.description}</p>

//                         <div className="space-y-2 text-sm mb-4">
//                           <div className="flex items-start gap-2 text-gray-600">
//                             <MapPin size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
//                             <span className="flex-1 line-clamp-1">{hotel.address}</span>
//                           </div>
//                           <div className="flex justify-between items-center pt-2 border-t border-gray-200">
//                             <span className="text-green-600 font-bold text-xl">{hotel.price}</span>
//                             <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
//                               {hotel.type}
//                             </span>
//                           </div>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex gap-2">
//                           {hotel.mapsLink && (
//                             <a 
//                               href={hotel.mapsLink}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
//                             >
//                               <Map size={16} />
//                               <span>View Map</span>
//                             </a>
//                           )}
//                           {hotel.bookingLink && (
//                             <a 
//                               href={hotel.bookingLink}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="flex-1 flex items-center justify-center gap-1 bg-green-50 text-green-600 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
//                             >
//                               <ExternalLink size={16} />
//                               <span>Book Now</span>
//                             </a>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Activities Section */}
//             <div>
//               <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                 🎯 Activities & Experiences
//               </h4>
//               <div className="space-y-4">
//                 {day.activities?.map((activity, idx) => (
//                   <div 
//                     key={idx} 
//                     className="border-l-2 border-gray-200 pl-4 py-2 hover:border-blue-400 transition-colors"
//                   >
//                     <div className="flex items-center gap-2 mb-2">
//                       <Clock size={18} className="text-blue-600" />
//                       <span className="font-semibold text-blue-600">{activity.time}</span>
//                     </div>

//                     <h5 className="font-bold text-lg text-gray-900 mb-2">
//                       {activity.activity}
//                     </h5>

//                     <p className="text-gray-700 mb-3 leading-relaxed">
//                       {activity.description}
//                     </p>

//                     <div className="flex flex-wrap gap-4 text-sm">
//                       <div className="flex items-center gap-1 text-gray-600">
//                         <MapPin size={16} className="text-green-600" />
//                         <span>{activity.location}</span>
//                       </div>
//                       <div className="flex items-center gap-1 text-gray-600">
//                         <DollarSign size={16} className="text-green-600" />
//                         <span className="font-semibold">{activity.estimatedCost}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* Budget Breakdown */}
//       {itinerary.budgetBreakdown && (
//         <Card className="bg-green-50 border-2 border-green-200">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//             <DollarSign className="text-green-600" />
//             Budget Breakdown
//           </h2>
//           <div className="grid md:grid-cols-2 gap-4">
//             {Object.entries(itinerary.budgetBreakdown).map(([key, value]) => (
//               <div 
//                 key={key} 
//                 className={`flex justify-between items-center p-3 rounded-lg ${
//                   key === 'total' ? 'bg-green-600 text-white font-bold text-lg' : 'bg-white'
//                 }`}
//               >
//                 <span className="capitalize">{key}:</span>
//                 <span className="font-bold">{value}</span>
//               </div>
//             ))}
//           </div>
//         </Card>
//       )}

//       {/* Travel Tips */}
//       {itinerary.travelTips && itinerary.travelTips.length > 0 && (
//         <Card className="bg-yellow-50 border-2 border-yellow-200">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//             <Lightbulb className="text-yellow-600" />
//             Travel Tips
//           </h2>
//           <ul className="space-y-3">
//             {itinerary.travelTips.map((tip, idx) => (
//               <li key={idx} className="flex items-start gap-3">
//                 <span className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">
//                   {idx + 1}
//                 </span>
//                 <span className="text-gray-700">{tip}</span>
//               </li>
//             ))}
//           </ul>
//         </Card>
//       )}

//       {/* Packing List */}
//       {itinerary.packingList && itinerary.packingList.length > 0 && (
//         <Card className="bg-purple-50 border-2 border-purple-200">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//             <Backpack className="text-purple-600" />
//             Packing List
//           </h2>
//           <div className="grid md:grid-cols-2 gap-3">
//             {itinerary.packingList.map((item, idx) => (
//               <div key={idx} className="flex items-center gap-2 bg-white p-3 rounded-lg">
//                 <span className="text-purple-600">✓</span>
//                 <span className="text-gray-700">{item}</span>
//               </div>
//             ))}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// };

import { Card } from './ui/Card';
import {
  MapPin,
  DollarSign,
  Clock,
  Calendar,
  Lightbulb,
  Backpack,
  Star,
  ExternalLink,
  Map,
  Phone,
  Mail,
  Globe,
  Utensils,
  Ticket,
  Navigation,
} from 'lucide-react';

export const ItineraryDisplay = ({ itinerary }) => {
  if (!itinerary) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Destination Header with Image */}
      <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
        <img
          src={itinerary.destinationImage || 'https://source.unsplash.com/1600x900/?travel,city'}
          alt={itinerary.tripTitle}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://source.unsplash.com/1600x900/?travel,city';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">{itinerary.tripTitle}</h1>
          <p className="text-xl text-gray-100 drop-shadow-md">{itinerary.overview}</p>
        </div>
      </div>

      {/* Daily Plans */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="text-blue-600" />
          Complete Day-by-Day Itinerary
        </h2>

        {itinerary.dailyPlan?.map((day) => (
          <Card key={day.day} className="hover:shadow-2xl transition-shadow">
            <div className="border-l-4 border-blue-600 pl-4 mb-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Day {day.day}: {day.title}
              </h3>
            </div>

            {/* Hotels Section */}
            {day.hotels && day.hotels.length > 0 && (
              <div className="mb-8">
                <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  🏨 Accommodation Options
                </h4>
                <div className="grid lg:grid-cols-2 gap-6">
                  {day.hotels.map((hotel, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-blue-100 rounded-xl overflow-hidden hover:border-blue-300 transition-all bg-white hover:shadow-2xl group"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src =
                              'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop';
                          }}
                        />
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                          <Star size={14} fill="white" />
                          <span>{hotel.rating}</span>
                        </div>
                        <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {hotel.type}
                        </div>
                      </div>

                      <div className="p-5">
                        <h5 className="font-bold text-xl text-gray-900 mb-2">{hotel.name}</h5>
                        <p className="text-gray-700 text-sm mb-4 leading-relaxed">{hotel.description}</p>

                        {hotel.roomTypes && (
                          <div className="mb-3">
                            <p className="text-xs font-semibold text-gray-600 mb-1">Available Rooms:</p>
                            <div className="flex flex-wrap gap-1">
                              {hotel.roomTypes.map((room, i) => (
                                <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                  {room}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {hotel.amenities && (
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-gray-600 mb-2">Amenities:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {hotel.amenities.slice(0, 6).map((amenity, i) => (
                                <div key={i} className="flex items-center gap-1 text-xs text-gray-600">
                                  <span className="text-green-500">✓</span>
                                  <span>{amenity}</span>
                                </div>
                              ))}
                            </div>
                            {hotel.amenities.length > 6 && (
                              <p className="text-xs text-blue-600 mt-1">
                                +{hotel.amenities.length - 6} more amenities
                              </p>
                            )}
                          </div>
                        )}

                        <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                          <div className="flex items-start gap-2 text-sm text-gray-600">
                            <MapPin size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">{hotel.address}</p>
                              {hotel.distanceFromCenter && (
                                <p className="text-xs text-gray-500">{hotel.distanceFromCenter} from center</p>
                              )}
                            </div>
                          </div>

                          {hotel.contact && (
                            <>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone size={14} className="text-green-600" />
                                <span>{hotel.contact.phone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Mail size={14} className="text-red-600" />
                                <span className="truncate">{hotel.contact.email}</span>
                              </div>
                            </>
                          )}

                          {hotel.checkIn && (
                            <div className="flex items-center gap-4 text-xs text-gray-600">
                              <span>
                                Check-in: <strong>{hotel.checkIn}</strong>
                              </span>
                              <span>
                                Check-out: <strong>{hotel.checkOut}</strong>
                              </span>
                            </div>
                          )}
                        </div>

                        {hotel.nearbyAttractions && (
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-gray-600 mb-2">Nearby:</p>
                            <div className="space-y-1">
                              {hotel.nearbyAttractions.slice(0, 3).map((attraction, i) => (
                                <div key={i} className="flex items-center gap-1 text-xs text-gray-600">
                                  <Navigation size={12} className="text-purple-500" />
                                  <span>{attraction}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <span className="text-2xl font-bold text-green-600">{hotel.price}</span>
                            <p className="text-xs text-gray-500">per night</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          {hotel.mapsLink && (
                            <a
                              href={hotel.mapsLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center justify-center gap-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors text-xs font-medium"
                            >
                              <Map size={16} />
                              <span>Map</span>
                            </a>
                          )}
                          {hotel.bookingLink && (
                            <a
                              href={hotel.bookingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center justify-center gap-1 bg-green-50 text-green-600 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors text-xs font-medium"
                            >
                              <ExternalLink size={16} />
                              <span>Book</span>
                            </a>
                          )}
                          {hotel.contact?.website && (
                            <a
                              href={hotel.contact.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center justify-center gap-1 bg-purple-50 text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-100 transition-colors text-xs font-medium"
                            >
                              <Globe size={16} />
                              <span>Site</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activities & Dining Section */}
            <div>
              <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                🎯 Activities & Dining Experience
              </h4>
              <div className="space-y-6">
                {day.activities?.map((activity, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl p-5 ${
                      activity.type === 'meal'
                        ? 'bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200'
                        : 'bg-gray-50 border-2 border-gray-200'
                    } hover:shadow-lg transition-all`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue-600 text-white p-2 rounded-lg">
                        <Clock size={20} />
                      </div>
                      <div>
                        <span className="font-bold text-lg text-blue-600">{activity.time}</span>
                        {activity.duration && (
                          <span className="ml-2 text-sm text-gray-600">({activity.duration})</span>
                        )}
                      </div>
                    </div>

                    <h5 className="font-bold text-xl text-gray-900 mb-3 flex items-center gap-2">
                      {activity.type === 'meal' && <Utensils size={20} className="text-orange-600" />}
                      {activity.activity}
                    </h5>
                    <p className="text-gray-700 mb-4 leading-relaxed">{activity.description}</p>

                    {/* Restaurant Details (if type = meal) */}
                    {activity.restaurant && (
                      <div className="bg-white rounded-lg p-4 mb-4 border border-orange-200">
                        {/* Restaurant Image */}
                        <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                          <img
                            src={activity.restaurant.image}
                            alt={activity.restaurant.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop';
                            }}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin size={14} className="text-green-600" />
                            <span className="truncate">{activity.restaurant.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock size={14} className="text-blue-600" />
                            <span>{activity.restaurant.hours}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone size={14} className="text-purple-600" />
                            <span>{activity.restaurant.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <DollarSign size={14} className="text-green-600" />
                            <span className="font-semibold">{activity.restaurant.priceRange}</span>
                          </div>
                        </div>

                        {activity.restaurant.menuHighlights && (
                          <div className="mb-3">
                            <p className="text-xs font-semibold text-gray-700 mb-2">Menu Highlights:</p>
                            <div className="flex flex-wrap gap-2">
                              {activity.restaurant.menuHighlights.map((item, i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {activity.restaurant.reservationRequired && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3">
                            <p className="text-xs text-yellow-800 font-medium">⚠️ Reservation recommended</p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2">
                          {activity.restaurant.bookingLink && (
                            <a
                              href={activity.restaurant.bookingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                            >
                              <Utensils size={16} />
                              <span>Reserve Table</span>
                            </a>
                          )}
                          {activity.restaurant.mapsLink && (
                            <a
                              href={activity.restaurant.mapsLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                              <Map size={16} />
                              <span>Directions</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Non-meal activity details */}
                    <div className="flex flex-wrap gap-4 text-sm mb-3">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin size={16} className="text-green-600" />
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <DollarSign size={16} className="text-green-600" />
                        <span className="font-semibold">{activity.estimatedCost}</span>
                      </div>
                    </div>

                    {activity.type !== 'meal' && (
                      <div className="flex gap-2">
                        {activity.mapsLink && (
                          <a
                            href={activity.mapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            <Map size={16} />
                            <span>View Location</span>
                          </a>
                        )}
                        {activity.ticketBooking && (
                          <a
                            href={activity.ticketBooking}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                          >
                            <Ticket size={16} />
                            <span>Book Tickets</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Budget Breakdown */}
      {itinerary.budgetBreakdown && (
        <Card className="bg-green-50 border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="text-green-600" />
            Complete Budget Breakdown
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(itinerary.budgetBreakdown).map(([key, value]) => (
              <div
                key={key}
                className={`flex justify-between items-center p-4 rounded-lg ${
                  key === 'total' ? 'bg-green-600 text-white font-bold text-lg' : 'bg-white'
                }`}
              >
                <span className="capitalize">{key}:</span>
                <span className="font-bold">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
            <p className="text-sm text-gray-600">
              💡 <strong>Note:</strong> All prices are estimates and may vary based on season, availability, and booking
              time. We recommend booking hotels and restaurants in advance for better rates and availability.
            </p>
          </div>
        </Card>
      )}

      {/* Travel Tips */}
      {itinerary.travelTips && itinerary.travelTips.length > 0 && (
        <Card className="bg-yellow-50 border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="text-yellow-600" />
            Essential Travel Tips
          </h2>
          <ul className="space-y-3">
            {itinerary.travelTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="bg-yellow-600 text-white rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  {idx + 1}
                </span>
                <span className="text-gray-700 flex-1">{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Packing List */}
      {itinerary.packingList && itinerary.packingList.length > 0 && (
        <Card className="bg-purple-50 border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Backpack className="text-purple-600" />
            Essential Packing List
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {itinerary.packingList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white p-3 rounded-lg">
                <span className="text-purple-600 text-lg">✓</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Quick Links Summary */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📌 Quick Booking Links</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-2">🏨 Hotels</h3>
            <a
              href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
                itinerary.tripTitle.split(' ').slice(-2).join(' ')
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Search all hotels on Booking.com
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-2">🍽️ Restaurants</h3>
            <a
              href={`https://www.opentable.com/s?term=${encodeURIComponent(
                itinerary.tripTitle.split(' ').slice(-2).join(' ')
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Reserve tables on OpenTable
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-2">🎟️ Activities</h3>
            <a
              href={`https://www.getyourguide.com/s/?q=${encodeURIComponent(
                itinerary.tripTitle.split(' ').slice(-2).join(' ')
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Book tours on GetYourGuide
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};
