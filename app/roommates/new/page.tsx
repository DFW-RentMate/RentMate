"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiTrash2 } from "react-icons/fi";

const CITIES = [
  "Richardson",
  "Plano",
  "Carrollton",
  "Dallas",
  "Arlington",
  "Irving",
  "Frisco",
  "Allen",
  "Denton",
  "Lewisville",
  "McKinney",
  "Coppell",
  "Garland",
  "전체지역",
];

const CLEANLINESS_LABELS: { [key: number]: string } = {
  1: "1(매우 느슨) - 현재: 매우 느슨",
  2: "2(약간 느슨) - 현재: 약간 느슨",
  3: "1(매우 느슨) - 5(매우 깔끔) · 현재: 보통",
  4: "4(약간 깔끔) - 현재: 깔끔",
  5: "5(매우 깔끔) - 현재: 매우 깔끔",
};

// 💡 DB Date 문자열을 Input[type=date] 형식(YYYY-MM-DD)으로 변환
const formatDateForInput = (dateStr?: string | null) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toISOString().split("T")[0];
};

// 💡 DB 시간 정보를 HH:mm 문자열로 변환
const formatTimeForInput = (dateStr?: string | null, fallback = "07:00") => {
  if (!dateStr) return fallback;
  const d = new Date(dateStr);
  const hours = String(d.getUTCHours()).padStart(2, "0");
  const minutes = String(d.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default function RoommateFormPage() {
  const router = useRouter();

  const [isEditMode, setIsEditMode] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 💡 폼 상태 관리
  const [matchingActive, setMatchingActive] = useState(true);
  const [desiredCity, setDesiredCity] = useState("Richardson");
  const [budgetMin, setBudgetMin] = useState(400);
  const [budgetMax, setBudgetMax] = useState(1500);
  const [wakeUpTime, setWakeUpTime] = useState("07:00");
  const [sleepTime, setSleepTime] = useState("23:00");
  const [cleanlinessLevel, setCleanlinessLevel] = useState(3);
  const [smoking, setSmoking] = useState(false);
  const [petsOk, setPetsOk] = useState(false);
  const [preferredGender, setPreferredGender] = useState("Any");
  const [moveInDate, setMoveInDate] = useState("");
  const [selfIntro, setSelfIntro] = useState("");

  // 💡 1. 페이지 진입 시 기존 내 프로필 정보 불러오기
  useEffect(() => {
    fetch("/api/roommates")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          const p = data.profile;
          setIsEditMode(true);
          setMatchingActive(p.matching_active ?? true);
          setDesiredCity(p.desired_city || "Richardson");
          setBudgetMin(Number(p.budget_min || 400));
          setBudgetMax(Number(p.budget_max || 1500));
          setWakeUpTime(formatTimeForInput(p.wake_up_time, "07:00"));
          setSleepTime(formatTimeForInput(p.sleep_time, "23:00"));
          setCleanlinessLevel(Number(p.cleanliness_level || 3));
          setSmoking(Boolean(p.smoking));
          setPetsOk(Boolean(p.pets_ok));
          setPreferredGender(p.preferred_roommate_gender || "Any");
          setMoveInDate(formatDateForInput(p.move_in_date));
          setSelfIntro(p.self_intro || "");
        }
      })
      .catch((err) => console.error("기존 프로필 로드 실패:", err))
      .finally(() => setPageLoading(false));
  }, []);

  // 💡 2. 프로필 저장 / 수정 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!desiredCity || !moveInDate || !selfIntro.trim()) {
      alert("필수 항목(*)을 모두 입력해 주세요.");
      return;
    }
    if (selfIntro.trim().length < 10) {
      alert("자기소개는 최소 10자 이상 작성해 주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/roommates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchingActive,
          desiredCity,
          budgetMin,
          budgetMax,
          wakeUpTime,
          sleepTime,
          cleanlinessLevel,
          smoking,
          petsOk,
          preferredGender,
          moveInDate,
          selfIntro,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "저장 실패");
      }

      alert(
        isEditMode
          ? "룸메이트 프로필이 성공적으로 수정되었습니다!"
          : "룸메이트 프로필이 성공적으로 등록되었습니다!",
      );
      router.push("/roommates");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  // 💡 3. 프로필 삭제 핸들러 (수정 모드일 때만 동작)
  const handleDelete = async () => {
    if (
      !confirm(
        "정말로 프로필을 삭제하시겠습니까?\n삭제 후에는 룸메이트 목록에서 사라집니다.",
      )
    ) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/roommates", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("프로필 삭제에 실패했습니다.");
      }

      alert("프로필이 정상적으로 삭제되었습니다.");
      router.push("/roommates");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert(error.message);
      setSubmitting(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[#fcfaf8] flex justify-center items-center">
        <p className="text-gray-400 font-bold text-sm animate-pulse">
          프로필 정보를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf8] py-10">
      <div className="max-w-2xl mx-auto px-6">
        {/* 상단 뒤로가기 & 타이틀 */}
        <div className="mb-8">
          <Link
            href="/roommates"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-4"
          >
            <FiChevronLeft className="w-4 h-4 mr-1" />
            룸메이트 찾기로 돌아가기
          </Link>
          {/* 💡 isEditMode에 따른 타이틀 변신 */}
          <h1 className="text-2xl font-extrabold text-gray-900">
            {isEditMode ? "룸메이트 프로필 수정" : "룸메이트 프로필 등록"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEditMode
              ? "수정하신 정보는 룸메이트 찾기 매칭에 실시간으로 반영됩니다."
              : "프로필을 등록하면 비슷한 조건의 룸메이트를 찾을 수 있습니다."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. 매칭 노출 ON/OFF 스위치 카운터 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                룸메이트 찾는 중 (매칭 노출 ON/OFF)
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                현재 프로필이 검색에 노출됩니다. 다른 사용자가 나를 찾을 수
                있어요.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMatchingActive(!matchingActive)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                matchingActive ? "bg-[#ff6b4a]" : "bg-gray-200"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  matchingActive ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* 2. 희망 도시 Desired City */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-3">
            <label className="block text-sm font-bold text-gray-900">
              희망 도시 Desired city <span className="text-[#ff6b4a]">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setDesiredCity(city)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    desiredCity === city
                      ? "bg-[#fff2ef] text-[#ff6b4a] border-2 border-[#ff6b4a] font-bold"
                      : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* 3. 예산 범위 Budget range */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-900">
                예산 범위 Budget range ($/월)
              </label>
              <span className="text-sm font-extrabold text-[#ff6b4a]">
                ${budgetMin} ~ ${budgetMax}+
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-400 block mb-1">
                  최소 예산
                </span>
                <input
                  type="number"
                  step="50"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:border-[#ff6b4a]"
                />
              </div>
              <div>
                <span className="text-xs text-gray-400 block mb-1">
                  최대 예산
                </span>
                <input
                  type="number"
                  step="50"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:border-[#ff6b4a]"
                />
              </div>
            </div>
          </div>

          {/* 4. 기상 시간 & 취침 시간 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-1">
                기상 시간 Wake-up time
              </label>
              <input
                type="time"
                value={wakeUpTime}
                onChange={(e) => setWakeUpTime(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 font-medium focus:outline-none focus:border-[#ff6b4a]"
              />
              <span className="text-xs text-gray-400 mt-1 block">
                평소 일어나는 시간
              </span>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-1">
                취침 시간 Sleep time
              </label>
              <input
                type="time"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 font-medium focus:outline-none focus:border-[#ff6b4a]"
              />
              <span className="text-xs text-gray-400 mt-1 block">
                평소 잠드는 시간
              </span>
            </div>
          </div>

          {/* 5. 청결도 Cleanliness Level */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-2">
            <label className="block text-sm font-bold text-gray-900">
              청결도 Cleanliness level
            </label>
            <p className="text-xs text-gray-400">
              {CLEANLINESS_LABELS[cleanlinessLevel]}
            </p>
            <div className="flex gap-3 pt-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setCleanlinessLevel(level)}
                  className="p-1 focus:outline-none transform hover:scale-110 transition-transform"
                >
                  <svg
                    className={`w-7 h-7 ${
                      level <= cleanlinessLevel
                        ? "text-[#ff6b4a] fill-current"
                        : "text-gray-200 fill-current"
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* 6. 흡연 Smoking & 반려동물 OK Pets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-gray-900 block">
                  흡연 Smoking
                </span>
                <span className="text-xs text-gray-400">
                  흡연자이거나 흡연 OK
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSmoking(!smoking)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                  smoking ? "bg-[#ff6b4a]" : "bg-gray-200"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    smoking ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-gray-900 block">
                  반려동물 OK Pets
                </span>
                <span className="text-xs text-gray-400">
                  반려동물과 함께 살 예정
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPetsOk(!petsOk)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                  petsOk ? "bg-[#ff6b4a]" : "bg-gray-200"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    petsOk ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 7. 선호 룸메이트 성별 Preferred roommate gender */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-3">
            <label className="block text-sm font-bold text-gray-900">
              선호 룸메이트 성별 Preferred roommate gender
            </label>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "무관 Any", value: "Any" },
                { label: "남성 Male", value: "M" },
                { label: "여성 Female", value: "F" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setPreferredGender(item.value)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 border transition-all ${
                    preferredGender === item.value
                      ? "bg-[#fff2ef] text-[#ff6b4a] border-[#ff6b4a] font-bold"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      preferredGender === item.value
                        ? "border-[#ff6b4a]"
                        : "border-gray-300"
                    }`}
                  >
                    {preferredGender === item.value && (
                      <span className="w-2 h-2 rounded-full bg-[#ff6b4a]" />
                    )}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 8. 입주 희망일 Move-in Date */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-2">
            <label className="block text-sm font-bold text-gray-900">
              입주 희망일 Move-in date <span className="text-[#ff6b4a]">*</span>
            </label>
            <input
              type="date"
              required
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-[#ff6b4a]"
            />
          </div>

          {/* 9. 자기소개 Self Introduction */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-2">
            <label className="block text-sm font-bold text-gray-900">
              자기소개 Self introduction{" "}
              <span className="text-[#ff6b4a]">*</span>
            </label>
            <textarea
              rows={4}
              required
              maxLength={300}
              value={selfIntro}
              onChange={(e) => setSelfIntro(e.target.value)}
              placeholder="나에 대해 간단히 소개해 주세요. 생활 습관, 취미, 룸메이트에게 바라는 점 등을 적어주세요."
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 leading-relaxed focus:outline-none focus:border-[#ff6b4a] resize-none"
            />
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>최소 10자 이상 입력해 주세요.</span>
              <span>{selfIntro.length}/300</span>
            </div>
          </div>

          {/* 10. 하단 액션 바 (삭제 / 취소 / 저장·수정완료 버튼) */}
          <div className="flex justify-between items-center pt-4">
            {/* 💡 수정 모드일 때만 '프로필 삭제' 버튼 표시 */}
            <div>
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                  프로필 삭제
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/roommates"
                className="px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                취소
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 rounded-xl bg-[#ff6b4a] hover:bg-[#e55a3b] text-white font-bold text-sm shadow-sm transition-all disabled:opacity-50"
              >
                {submitting
                  ? "처리 중..."
                  : isEditMode
                    ? "수정 완료"
                    : "프로필 저장"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
