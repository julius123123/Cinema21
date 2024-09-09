"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/app/Components/Sidebar";
import Search from "@/app/Components/Search";
import Bubble from "@/app/Components/Bubble";
import Box from "@/app/Components/Box";

interface Place {
  _id: string;
  nama: string;
  lokasi: string;
  buka: string;
  tutup: string;
  hariTutup: string[];
  kursi: string;
  meja: string;
  listrik: boolean;
  ac: boolean;
  bebasRokok: boolean;
  kondusif: boolean;
  lepasAlasKaki: boolean;
  makan: boolean;
  minum: boolean;
  wifi: boolean;
  fasilitas: string[];
  img: string;
}

// Base URL API
const base_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/places";

function StudySpace() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [sort, setSort] = useState({ sort: "rating", order: "desc" });
  const [filterFacilities, setFilterFacilities] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllPlaces = async () => {
      try {
        const url = `${base_url}?page=${page}&sort=${sort.sort},${sort.order}&fasilitas=${filterFacilities.toString()}&search=${search}`;
        const { data } = await axios.get(url);
  
        console.log("Fetched places:", data.places); // Log the places array
  
        if (data && Array.isArray(data.places)) {
          setPlaces(data.places);
        } else {
          console.error("Data received is not an array:", data.places);
          setPlaces([]);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    getAllPlaces();
  }, [sort, filterFacilities, page, search]);
  

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col p-5">
        {" "}
        <Search setSearch={(search) => setSearch(search)} /> {/* Komponen pencarian di atas */}
        <div className="flex gap-4 my-5 ml-6">
          {" "}
          <Bubble placeholderText="near ITB Ganesha" />
          <Bubble placeholderText="near ITB Jatinangor" />
          <Bubble placeholderText="near ITB Cirebon" />
        </div>
        <div className="flex flex-wrap gap-8">
          {places.map((place) => (
            <Box 
            key={ place._id } 
            place={place}
            placeName={place.nama} 
            openingHours={`${place.buka} - ${place.tutup}`} 
            imageUrl={place.img} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudySpace;
