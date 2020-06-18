
// 초기 상태 정의
const initialState = {
    category: "all",
    categoryList: [

    ],
    productList: [

    ],
    CurrentProduct: "",
    Currentnv_mid: "",
    CurrentKeyword: "",
    searchKeyword: '',
    SearchMin: 0,
    SearchMax: 0,
    SearchTextField: '',
    SearchSentiField: '',
    reviewNumber: [],
    reviewLabels: [

    ],
    ReviewData: [

    ],
    SentimentalLabel: ["1", '2', '3', '4', '5'],
    SentimentalNumber: [10, 20, 30, 40, 30],
    SentimentalData: [

    ],
    BestReview: [

    ],

    WorstReview: [

    ],
    ReviewSentence: [

    ],
    BestSentence: [

    ],
    WorstSentence: [

    ],
};

//category 액션 타입과 생성함수 정의
const CHANGE_CATEGORY = 'productList/CHANGE_CATEGORY';
const CHANGE_CATEGORYLIST = 'productList/CHANGE_CATEGORYLIST'
const CHANGE_PRODUCTLIST = 'productList/CHANGE_PRODUCTLIST';
const CHANGE_CURRENTPRODUCT = 'productList/CHANGE_CURRENTPRODUCT';
const CHANGE_CURRENTKEYWORD = 'productList/CHANGE_CURRENTKEYWORD';
const CHANGE_REVEIW = 'productList/CHANGE_REVIEW';
const CHANGE_SENTIMENTALDATA = 'productList/SentimentalData';
const CHANGE_SENTIMENTALLABELS = 'productList/SentimentalLabel';
const CHANGE_SENTIMENTALNUMBER = 'productList/SentimentalNumber';
const CHANGE_BESTREVIEW = 'productList/BestReview';
const CHANGE_WORSTREVIEW = 'productList/WorstReview';
const CHANGE_CURRENTNV_MID = 'productList/Currentnv_mid';
const CHANGE_REVIEWNUMBER = 'CHANGE_REVIEWNUMBER';
const CHANGE_REVIEWLABELS = 'CHANGE_REVIEWLABEL';
const SEARCH_KEYWORD = "searchKeyword";
const SEARCH_MIN = "search_min";
const SEARCH_MAX = "search_max";
const SEARCH_TEXTFIELD = "Search_TextField";
const SEARCH_SENTIFIELD = "Search_SentiField";
const CHANGE_BESTSENTENCE = 'BestSentence';
const CHANGE_WORSTSENTENCE = 'WorstSentence';
const CHANGE_REVIEWSENTENCE = 'ReviewSentence';

export const changeCategory = category => ({ type: CHANGE_CATEGORY, category });
export const changeCategoryList = categoryList => ({ type: CHANGE_CATEGORYLIST, categoryList })
export const changeProductList = productList => ({ type: CHANGE_PRODUCTLIST, productList });
export const changeCurrentProduct = CurrentProduct => ({ type: CHANGE_CURRENTPRODUCT, CurrentProduct });
export const changeCurrentKeyword = CurrentKeyword => ({ type: CHANGE_CURRENTKEYWORD, CurrentKeyword });
export const changeReview = ReviewData => ({ type: CHANGE_REVEIW, ReviewData });
export const change_SentimentalLabels = SentimentalLabel => ({ type: CHANGE_SENTIMENTALLABELS, SentimentalLabel });
export const changeSentimentalData = SentimentalData => ({ type: CHANGE_SENTIMENTALDATA, SentimentalData });
export const changeSentimentalNumber = SentimentalNumber => ({ type: CHANGE_SENTIMENTALNUMBER, SentimentalNumber });
export const changeBestReview = BestReview => ({ type: CHANGE_BESTREVIEW, BestReview });
export const changeWorstReview = WorstReview => ({ type: CHANGE_WORSTREVIEW, WorstReview });
export const changeBestSentence = BestSentence => ({ type: CHANGE_BESTSENTENCE, BestSentence });
export const changeWorstSentence = WorstSentence => ({ type: CHANGE_WORSTSENTENCE, WorstSentence });
export const changeReviewSentence = ReviewSentence => ({ type: CHANGE_REVIEWSENTENCE, ReviewSentence });
export const changeCurrentnv_mid = Currentnv_mid => ({ type: CHANGE_CURRENTNV_MID, Currentnv_mid });
export const Change_ReviewNumber = reviewNumber => ({ type: CHANGE_REVIEWNUMBER, reviewNumber });
export const change_ReviewLabels = reviewLabels => ({ type: CHANGE_REVIEWLABELS, reviewLabels });
export const search_keyword = searchKeyword => ({ type: SEARCH_KEYWORD, searchKeyword });
export const search_min = SearchMin => ({ type: SEARCH_MIN, SearchMin });
export const search_max = SearchMax => ({ type: SEARCH_MAX, SearchMax });
export const Search_TextField = SearchTextField => ({ type: SEARCH_TEXTFIELD, SearchTextField });
export const Search_SentiField = SearchSentiField => ({ type: SEARCH_SENTIFIELD, SearchSentiField });
//카테고리를 바꾸는 action이 클릭된 순간 아래의 productList또한 바뀌어야 하기에 세팅하는것이다.

export default function ProductList(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CATEGORY:
            return {
                ...state,
                category: action.category,
                //productList: action.productList,
            };
        case CHANGE_CATEGORYLIST:
            return {
                ...state,
                categoryList: action.categoryList,
            };
        case CHANGE_PRODUCTLIST:
            return {
                ...state,
                productList: action.productList,
            }
        case CHANGE_CURRENTPRODUCT:
            return {
                ...state,
                CurrentProduct: action.CurrentProduct,
            }
        case CHANGE_CURRENTKEYWORD:
            return {
                ...state,
                CurrentKeyword: action.CurrentKeyword,
            }
        case CHANGE_REVEIW:
            return {
                ...state,
                ReviewData: action.ReviewData,
            }
        case CHANGE_SENTIMENTALDATA:
            return {
                ...state,
                SentimentalData: action.SentimentalData,
            }
        case CHANGE_SENTIMENTALLABELS:
            return {
                ...state,
                SentimentalLabel: action.SentimentalLabel,
            }
        case CHANGE_SENTIMENTALNUMBER:
            return {
                ...state,
                SentimentalNumber: action.SentimentalNumber,
            }
        case CHANGE_BESTREVIEW:
            return {
                ...state,
                BestReview: action.BestReview,
            }
        case CHANGE_WORSTREVIEW:
            return {
                ...state,
                WorstReview: action.WorstReview,
            }
        case CHANGE_CURRENTNV_MID:
            return {
                ...state,
                Currentnv_mid: action.Currentnv_mid,
            }
        case CHANGE_REVIEWNUMBER:
            return {
                ...state,
                reviewNumber: action.reviewNumber,
            }
        case CHANGE_REVIEWLABELS:
            return {
                ...state,
                reviewLabels: action.reviewLabels,
            }
        case SEARCH_KEYWORD:
            return {
                ...state,
                searchKeyword: action.searchKeyword,
            }
        case SEARCH_MIN:
            return {
                ...state,
                SearchMin: action.SearchMin,
            }
        case SEARCH_MAX:
            return {
                ...state,
                SearchMax: action.SearchMax,
            }
        case SEARCH_TEXTFIELD:
            return {
                ...state,
                SearchTextField: action.SearchTextField,
            }
        case SEARCH_SENTIFIELD:
            return {
                ...state,
                SearchSentiField: action.SearchSentiField,
            }
        case CHANGE_BESTSENTENCE:
            return {
                ...state,
                BestSentence: action.BestSentence,
            }
        case CHANGE_WORSTSENTENCE:
            return {
                ...state,
                WorstSentence: action.WorstSentence,
            }
        case CHANGE_REVIEWSENTENCE:
            return {
                ...state,
                ReviewSentence: action.ReviewSentence,
            }
        default:
            return state;
    }

}

/*
1. init에 변수 명 값 추가하기
2. 액션 타입과 함수 정의
3. 함수의 return 정리
4. 함수에 붙이기
*/
