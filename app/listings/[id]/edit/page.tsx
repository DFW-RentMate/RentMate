import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import getListingById from '@/app/actions/getListingById';
import ListingWizard from '@/app/listings/new/ListingWizard';
import { DB_TO_ROOM_TYPE, DB_TO_GENDER } from '@/app/listings/new/mappings';

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  const listing = await getListingById(id);
  if (!listing) redirect('/listings');

  const initialData = {
    title: listing.title,
    address: listing.address_raw ?? '',
    city: listing.city ?? '',
    rentPrice: String(listing.rent_price),
    deposit: String(listing.deposit ?? 0),
    moveInDate: listing.move_in_date?.slice(0, 10) ?? '',
    contactPhone: listing.contact_phone ?? '',
    contactKakao: listing.contact_kakao ?? '',
    roomType: DB_TO_ROOM_TYPE[listing.room_type],
    genderPreference: DB_TO_GENDER[listing.gender_preference ?? 'Any'],
    petsAllowed: listing.pets_allowed ?? false,
    smokingAllowed: listing.smoking_allowed ?? false,
    parkingAvailable: listing.parking_available ?? false,
    furnished: listing.furnished ?? false,
    electricityIncluded: listing.electricity_included ?? false,
    waterIncluded: listing.water_included ?? false,
    gasIncluded: listing.gas_included ?? false,
    internetIncluded: listing.internet_included ?? false,
    trashIncluded: listing.trash_included ?? false,
    hasWasher: listing.has_washer ?? false,
    hasDryer: listing.has_dryer ?? false,
    hasRefrigerator: listing.has_refrigerator ?? false,
    hasAc: listing.has_ac ?? false,
    hasHeating: listing.has_heating ?? false,
    hasTv: listing.has_tv ?? false,
    amenitiesEtc: listing.amenities_etc ?? '',
    description: listing.description ?? '',
    photos: [],
  };

  return <ListingWizard mode="edit" listingId={id} initialData={initialData} />;
};

export default EditPage;
