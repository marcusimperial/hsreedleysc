import PlacesAutocomplete from "react-places-autocomplete";
import { useState } from 'react';

export default function Address({ address, setAddress }){

    const [addressInput, setAddressInput] = useState("");

    const handlePlaceError = async (e) => console.log(e);
    const handleAddressInput = async (input) => setAddressInput(input);
    const handleAddressSelect = async (select) => setAddress(select);

    const searchOptions = {
        bounds: new window.google.maps.LatLngBounds(new window.google.maps.LatLng(14.6091, 121.0223)),
        strictBounds: true,
        componentRestrictions: { country: "ph" },
    }

    return (
        <>
            <PlacesAutocomplete value={addressInput} searchOptions={searchOptions} onSelect={handleAddressSelect} onChange={handleAddressInput} onError={handlePlaceError}>
                {({ getInputProps, getSuggestionItemProps, suggestions }) => (
                    <div>
                        <input {...getInputProps()} />
                        {suggestions.map((suggestion, i) => (<button {...getSuggestionItemProps(suggestion)} key={`s${i}`} className="button sm">{suggestion.description}</button>))}
                    </div>
                )}
            </PlacesAutocomplete>
        </>
    )
}