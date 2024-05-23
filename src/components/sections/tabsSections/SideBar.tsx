import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import {
  Card,
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import { Sidebar } from '@/components/PageContent';
interface SideBarProps {
  SidebarData?: Sidebar[] | undefined;
  pageId?: number | undefined;
}
interface SearchResult{
  item: Sidebar | null;
  parent: Sidebar | null ;
}
const findItemWithParent = (data: Sidebar[],pageId: number,parent: Sidebar | null = null):SearchResult => {
  for (const item of data) {
    if (item.id === pageId) {
      return { item, parent };
    }
    if (item.children) {
      const result = findItemWithParent(item.children, pageId, item);
      if (result.item) {
        return result;
      }
    }
  }
  return { item: null, parent: null };
};

const sortSidebarData = (data: Sidebar[]): Sidebar[] => {
  return data
    .sort((a, b) => a.pageOrder - b.pageOrder)
    .map((item) => {
      if (item.children) {
        return { ...item, children: sortSidebarData(item.children) };
      }
      return item;
    });
};

function SideBar({ SidebarData , pageId }: SideBarProps) {
  const initialOpenItems = JSON.parse(
    sessionStorage.getItem('sidebarMenus') || '[]',
  );
  const [openItems, setOpenItems] = React.useState<string[]>(initialOpenItems);
  const [sidebarId, setSidebarId] = React.useState<number | undefined>(pageId);

  React.useEffect(() => {
    sessionStorage.setItem('sidebarMenus', JSON.stringify(openItems));
  }, [openItems]);
  
  React.useEffect(() => {
    if (SidebarData && pageId) {
      const { item, parent } = findItemWithParent(SidebarData, pageId);
      if (item && !item.showInSidebar && parent) {
        setSidebarId(parent.id);
      }
    }
  }, [SidebarData, pageId]);

  const toggleItem = (slug: string) => {
    if (openItems.includes(slug)) {
      setOpenItems(openItems.filter((item) => item !== slug));
    } else {
      setOpenItems([...openItems, slug]);
    }
  };
  const renderSidebarItem = (item: Sidebar, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openItems.includes(item.slug);
    return (
      <ListItem
        key={item.id}
        className={`${item.showInSidebar ?'':'hidden'} ps-['${(level * 3)}px'] ${
          hasChildren
            ? 'hover:bg-white hover:text-black'
            : `${item.id === sidebarId ? 'bg-primary text-white' : 'text-sm'} hover:text-white hover:bg-primary`
        }  font-semibold border-b-[3px] rounded-none ml-0 min-w-0 p-0`}
      >
        {(hasChildren && item.showInSidebar) ? (
          <Accordion
            open={isOpen}
            icon={item.children  && !item.children.every(child => !child.showInSidebar) &&
              <IoIosArrowForward
                strokeWidth={2.5}
                onClick={() => toggleItem(item.slug)}
                className={`mx-auto h-6 w-6 transition-transform ${
                  isOpen ? 'rotate-90' : ''
                }`}
              />
            }
          >
            <AccordionHeader
              className={`border-b-0 p-0 ${item.id == sidebarId ?'border-t-[5px] border-primary':''}`}
            >
            <a href={`/${item?.slug}`} className={`w-full ps-2 ${item.id === sidebarId ? 'text-primary bg-white' : 'hover:text-white hover:bg-primary'}`}>
              <Typography className={`mr-auto font-semibold  ${item.id === sidebarId ?'text-base':'text-sm'}`}>
                  {item.title}
              </Typography>
            </a>
            </AccordionHeader>
            <AccordionBody className="py-0">
              <List className="p-0 min-w-0">
                {/* Recursively render children */}
                {item.children?.map((childItem: Sidebar) =>
                  renderSidebarItem(childItem, level + 1),
                )}
              </List>
            </AccordionBody>
          </Accordion>
        ) : (
          // Render a navigation link for items without children
          <a href={`/${item?.slug}`} className="cursor-pointer w-full p-2">
            {item?.title}
          </a>
        )}
      </ListItem>
    );
  };

  const sortedSidebarData = SidebarData ? sortSidebarData(SidebarData) : [];
  return (
    <Card className="h-auto pb-2 w-full max-w-[20rem] rounded-none shadow-none">
      <List className="gap-0 min-w-0">
        {sortedSidebarData?.map((item: Sidebar) => renderSidebarItem(item))}
      </List>
    </Card>
  );
}

export default SideBar;
