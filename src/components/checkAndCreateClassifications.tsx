// 최초 로그인 여부를 판단하고 분류 데이터를 생성하는 함수
import {createClient} from "@/utils/supabase/client";
import {createClassifications} from "@/components/createClassifications";

export async function checkAndCreateClassifications() {
    const supabase = createClient();

    // 현재 로그인한 사용자 정보를 가져옵니다.
    const {data, error} = await supabase.auth.getUser();
    if (error || !data.user) {
        console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
        return;
    }

    const {id, created_at, last_sign_in_at} = data.user;

    // created_at과 last_sign_in_at이 정상적인 문자열인지 확인합니다.
    if (!created_at || !last_sign_in_at) {
        console.error("타임스탬프 정보가 없습니다.");
        return;
    }

    // ISO 형식의 타임스탬프 문자열에서 연도-월-일T시:분까지만 추출 (예: "2023-09-27T12:34")
    const createdAtMinute = created_at.substring(0, 16);
    const lastSignInAtMinute = last_sign_in_at.substring(0, 16);

    // 분 단위가 같으면 최초 로그인으로 간주합니다.
    if (createdAtMinute === lastSignInAtMinute) {
        console.log("최초 로그인입니다. 분류 데이터를 생성합니다.");
        // 현재 origin (예: window.location.origin)을 인자로 전달합니다.
        await createClassifications(id, window.location.origin);
    } else {
        console.log("반복 로그인입니다. 분류 데이터 생성을 생략합니다.");
    }
}
