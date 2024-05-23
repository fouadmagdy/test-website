import { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/sections/Hero'));
const News = dynamic(() => import('@/components/sections/News/News'));
const Article = dynamic(() => import('@/components/sections/Article'));
const CampusLife = dynamic(() => import('@/components/sections/CampusLife'));
const TwoColumnsInfoImage = dynamic(
  () => import('@/components/sections/TwoColumnsInfoImage'),
);
const Acadimic = dynamic(() => import('@/components/sections/Acadimic'));
const Schedule = dynamic(
  () => import('@/components/sections/schedule/Schedule'),
);
const VideoCarousel = dynamic(
  () => import('@/components/sections/VideoCarousel'),
);
const StatisticWrapper = dynamic(
  () => import('@/components/sections/statistic/StatisticWrapper'),
);
const EventSlider = dynamic(
  () => import('@/components/shared/slider/eventSlider/EventSlider'),
);
const EventProgramSlider = dynamic(
  () => import('@/components/shared/slider/eventSlider/EventProgramSlider'),
);
const InovationSlider = dynamic(
  () => import('@/components/shared/slider/InovationSlider'),
);
const TwoColInfoList = dynamic(
  () => import('@/components/sections/TwoColInfoList'),
);
const DynamicContainer = dynamic(() => import('@/components/DynamicContainer'));
const EventsSection = dynamic(
  () => import('@/components/sections/events/EventsSection'),
);
// const HorizontalEvent = dynamic(
//   () => import('@/components/sections/events/EventsCalendar'),
// )
const AllNews = dynamic(
  () => import('@/components/sections/News/allNews/AllNews'),
);

const SingleNews = dynamic(
  () => import('@/components/sections/News/SingleNews'),
);

const SingleEvent = dynamic(
  () => import('@/components/sections/events/SingleEvent'),
);

const ValleyOfScienceAndTechnology = dynamic(
  () => import('@/components/shared/ValleyOfScience&Technology'),
);
const AcademicCalender = dynamic(
  () => import('@/components/sections/AcademicCalender'),
);
const BodSlider = dynamic(() => import('@/components/shared/slider/BodSlider'));
const BoardOftrustees = dynamic(
  () => import('@/components/sections/BoardOftrustees'),
);
const HorizontalTabs = dynamic(
  () => import('@/components/sections/tabsSections/HorizontalTabs'),
);
const SideMenuTabs = dynamic(
  () => import('@/components/sections/tabsSections/SideBar'),
);
const DetailedInfo = dynamic(
  () => import('@/components/sections/DetailedInfo'),
);
const FlippingCards = dynamic(
  () => import('@/components/sections/flippingCards/FlippingCards'),
);
const HeroCarousel = dynamic(
  () => import('@/components/sections/HeroCarousel'),
);
const CardsOverlay = dynamic(
  () => import('@/components/sections/CardsOverlay'),
);
const BackgoundInfo = dynamic(
  () => import('@/components/sections/BackgoundInfo'),
);
const ResearchSection = dynamic(
  () => import('@/components/sections/ResearchSection'),
);
const InnerBanner = dynamic(() => import('@/components/sections/InnerHero'));
const Banner = dynamic(() => import('@/components/sections/Banner'));
const InfoSlider = dynamic(
  () => import('@/components/shared/slider/InfoSlider'),
);
const Catalog = dynamic(() => import('@/components/catalog'));
const Breadcrump = dynamic(() => import('@/components/breadcrump'));

const IconBox = dynamic(() => import('@/components/sections/IconBox'));
const DetailedBanner = dynamic(
  () => import('@/components/sections/DetailedBanner'),
);
const DividedBanner = dynamic(
  () => import('@/components/sections/DividedBanner'),
);
const InfoCards = dynamic(() => import('@/components/sections/InfoCards'));
const GridContainer = dynamic(() => import('@/components/GridContainer'));
const SchoolsCount = dynamic(
  () => import('@/components/sections/schools/SchoolsCount'),
);
const SingleSchool = dynamic(
  () => import('@/components/sections/schools/SingleSchool'),
);
const SchoolAdmission = dynamic(
  () => import('@/components/sections/schools/schoolAdmission'),
);
const DynamicHero = dynamic(() => import('@/components/sections/DynamicHero'));
// const SideMenuContentSwitcher = dynamic(
//   () => import('@/components/sections/SideMenuContentSwitcher'),
// );
const TitleAndDesc = dynamic(
  () => import('@/components/sections/TitleAndDesc'),
);

const VideoBanner = dynamic(() => import('@/components/sections/VideoBanner'));

const MinCards = dynamic(() => import('@/components/sections/MinCards'));

const TitlesLinks = dynamic(() => import('@/components/sections/TitlesLinks'));

const MinAndLargeCards = dynamic(
  () => import('@/components/sections/MinAndLargeCards'),
);
const MiniFeatured = dynamic(
  () => import('@/components/sections/MiniFeatured'),
);
const FullScopeImagery = dynamic(
  () => import('@/components/sections/FullScopeImagery'),
);
const Descriptions = dynamic(
  () => import('@/components/sections/Descriptions'),
);
const Featured = dynamic(() => import('@/components/sections/Featured'));

const UndergradutePrograms = dynamic(
  () => import('@/components/sections/programs/undergradutePrograms'),
);
const Info = dynamic(() => import('@/components/sections/Info'));
const Collapse = dynamic(() => import('@/components/sections/collapse'));

const MembersCards = dynamic(
  () => import('@/components/sections/members/MembersCards'),
);

const MemberGallery = dynamic(
  () => import('@/components/sections/members/MemberGallery'),
);
const schoolPrograms = dynamic(
  () => import('@/components/sections/programs/schoolPrograms'),
);
const SingleProgram = dynamic(
  () => import('@/components/sections/programs/singleProgram'),
);
const ProgramNews = dynamic(
  () => import('@/components/sections/programs/ProgramNews'),
);
// pcomp.program-news

const MiniEvents = dynamic(
  () => import('@/components/shared/slider/eventSlider/MiniEvents'),
);
const AdvancedRichText = dynamic(
  () => import('@/components/sections/AdvancedRichText'),
);
const SingleMember = dynamic(
  () => import('@/components/sections/SingleMember'),
);

const Snapshot = dynamic(() => import('@/components/sections/Snapshot'));
const Map = dynamic(() => import('@/components/sections/Map'));

const Course = dynamic(() => import('@/components/sections/course/Course'));

const Courses = dynamic(() => import('@/components/sections/courses/Courses'));

interface PageComponentsMap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: ComponentType<any>;
}

/* The `SingleElementMap` is a mapping object that associates specific page components with their
corresponding keys. In this case, it maps the keys `'events'`, `'news'`, and `'all-news'` to the
components `EventDetails`, `NewsDetails`, and `NewsDetails` respectively. This mapping can be used
to dynamically render the appropriate component based on the key provided. */
export const SingleElementMap: PageComponentsMap = {
  // events: EventDetails,
  // singlenews: SingleNews,
  // schools: schoolDetails,
};

/* The `componentsMap` object is a mapping that associates specific keys with their corresponding React
components. Each key represents a specific page component, and the corresponding value is the React
component that should be rendered for that key. This mapping is used to dynamically render the
appropriate component based on the key provided. */
export const componentsMap: PageComponentsMap = {
  'pcomp.1-col-info': Article,
  'pcomp.2-col-info-image': TwoColumnsInfoImage,
  'pcomp.hero': Hero,
  'pcomp.academic-section': Acadimic,
  'pcomp.schedule': Schedule,
  'pcomp.news': News,
  'pcomp.campus-life': CampusLife,
  'pcomp.statistics': StatisticWrapper,
  'pcomp.events': EventSlider,
  'pcomp.program-events': EventProgramSlider,
  'pcomp.events-research': InovationSlider,
  'pcomp.2-col-info-list': TwoColInfoList,
  'pcomp.container': DynamicContainer,
  'pcomp.news-count': AllNews,
  'pcomp.2-col-info-multi-image': ValleyOfScienceAndTechnology,
  // 'col-cards':HorizontalEvent,
  'pcomp.programs-count': UndergradutePrograms,
  'pcomp.events-count': EventsSection,
  'col-cards': AllNews,
  'pcomp.video-carousel': VideoCarousel,
  'pcomp.taps-section': HorizontalTabs,
  'pcomp.sidebar-content-switcher': SideMenuTabs,
  'pcomp.calender': AcademicCalender,
  'pcomp.board-of-director-slider': BodSlider,
  'pcomp.mem-count-s': BoardOftrustees,
  'pcomp.more-info': DetailedInfo,
  'pcomp.flibing-card': FlippingCards,
  'pcomp.carousel': HeroCarousel,
  'pcomp.overlay-cards': CardsOverlay,
  'pcomp.card': BackgoundInfo,
  'pcomp.research-news': ResearchSection,
  'pcomp.banner': Banner,
  'pcomp.slider2': InfoSlider,
  'pcomp.inner-hero': InnerBanner,
  'pcomp.course-catalog': Catalog,
  'pcomp.catalog': Catalog,
  'pcomp.titles-boxes': IconBox,
  'pcomp.info-banner': DetailedBanner,
  'pcomp.divided-banner': DividedBanner,
  'grid-container': GridContainer,
  'pcomp.info-cards': InfoCards,
  'pcomp.schools-count': SchoolsCount,
  'pcomp.dynamic-hero': DynamicHero,
  // 'pcomp.side-menu': SideMenuContentSwitcher,
  'pcomp.title-and-desc': TitleAndDesc,
  'pcomp.media-section': VideoBanner,
  'pcomp.titleimg-cards': MinCards,
  'pcomp.major-events': MinAndLargeCards,
  'pcomp.titles-links': TitlesLinks,
  'pcomp.featured': Featured,
  'pcomp.info': Info,
  'pcomp.descriptions': Descriptions,
  'pcomp.mem-count': MembersCards,
  'pcomp.collapse': Collapse,
  'pcomp.single-news': SingleNews,
  'pcomp.single-event': SingleEvent,
  'pcomp.single-school': SingleSchool,
  'pcomp.single-admission': SchoolAdmission,
  'pcomp.school-programs': schoolPrograms,
  'pcomp.member-gallery': MemberGallery,
  'pcomp.full-scope-imagery': FullScopeImagery,
  'pcomp.mini-featured': MiniFeatured,
  'pcomp.single-program': SingleProgram,
  'pcomp.program-news': ProgramNews,
  'pcomp.mini-events': MiniEvents,
  'pcomp.breadcrumbs': Breadcrump,
  'pcomp.advanced-rich-text': AdvancedRichText,
  'pcomp.single-member': SingleMember,
  'pcomp.snapshot': Snapshot,
  'pcomp.map': Map,
  'pcomp.courses-count': Courses,
  'pcomp.single-course': Course,
};
