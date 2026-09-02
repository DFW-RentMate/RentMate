import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { geocodeAddress } from '@/app/listings/new/geocode';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: '인증 필요' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const fullAddress = body.zipCode
    ? `${body.addressRaw}, TX ${body.zipCode}`
    : `${body.addressRaw}, TX`;

  const { lat, lng } = await geocodeAddress(fullAddress);

  const updated = await prisma.listings.update({
    where: { id },
    data: {
      title: body.title,
      description: body.description,
      room_type: body.roomType,
      rent_price: body.rentPrice,
      deposit: body.deposit,
      move_in_date: body.moveInDate ? new Date(body.moveInDate) : null,
      contact_phone: body.contactPhone,
      contact_kakao: body.contactKakao,
      address_raw: body.addressRaw,
      city: body.city,
      latitude: lat,
      longitude: lng,
      gender_preference: body.genderPreference,
      pets_allowed: body.petsAllowed,
      smoking_allowed: body.smokingAllowed,
      parking_available: body.parkingAvailable,
      furnished: body.furnished,
      electricity_included: body.electricityIncluded,
      water_included: body.waterIncluded,
      gas_included: body.gasIncluded,
      internet_included: body.internetIncluded,
      trash_included: body.trashIncluded,
      has_washer: body.hasWasher,
      has_dryer: body.hasDryer,
      has_refrigerator: body.hasRefrigerator,
      has_ac: body.hasAc,
      has_heating: body.hasHeating,
      has_tv: body.hasTv,
      amenities_etc: body.amenitiesEtc,
      updated_at: new Date(),
    },
  });

  return NextResponse.json(updated);
}