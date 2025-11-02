import { useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Loader2 } from 'lucide-react';
import { PlacesAutocomplete } from './PlacesAutocomplete';

export const TripForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        destination: '',
        days: '',
        budget: 'Medium',
        travelers: '',
        interests: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Tell us about your dream trip
                </h2>
                <p className="text-gray-600">
                    Fill in the details and let AI create your perfect itinerary
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <PlacesAutocomplete
                    value={formData.destination}
                    onChange={(destination) => setFormData({ ...formData, destination })}
                    placeholder="e.g., Paris, France"
                    required
                />

                <div className="grid md:grid-cols-2 gap-5">
                    <Input
                        label="How many days?"
                        type="number"
                        min="1"
                        max="30"
                        placeholder="e.g., 5"
                        value={formData.days}
                        onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                        required
                    />

                    <Input
                        label="Number of travelers"
                        type="number"
                        min="1"
                        max="20"
                        placeholder="e.g., 2"
                        value={formData.travelers}
                        onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-gray-700">
                        Budget Level <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    >
                        <option value="Budget">Budget ($) - Affordable options</option>
                        <option value="Medium">Medium ($$) - Balanced comfort</option>
                        <option value="Luxury">Luxury ($$$) - Premium experience</option>
                    </select>
                </div>

                <Input
                    label="Your interests"
                    placeholder="e.g., food, museums, adventure, nightlife"
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    required
                />

                <Button
                    type="submit"
                    className="w-full text-lg py-4"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="inline mr-2 animate-spin" />
                            Generating your perfect trip...
                        </>
                    ) : (
                        'Generate My Itinerary ✨'
                    )}
                </Button>
            </form>
        </Card>
    );
};