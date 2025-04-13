'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Award, Briefcase, Building, MapPin, Search, Star, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const CareersSection = () => {
  const [isInView, setIsInView] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const sectionRef = useRef(null)

  // Theme colors matching other components
  const theme = {
    primary: '#e2cdb8',
    textLight: '#ffffff',
    textDark: '#111827',
    bgDark: 'rgba(17, 24, 39, 0.98)',
    accentLight: 'rgba(226, 205, 184, 0.15)',
  }

  // Use intersection observer to trigger animations when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    
    const currentRef = sectionRef.current
    
    if (currentRef) {
      observer.observe(currentRef)
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  // Department categories
  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'sales', name: 'Sales' },
    { id: 'service', name: 'Service & After-Sales' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'admin', name: 'Administration' },
    { id: 'parts', name: 'Parts & Logistics' }
  ]

  // Sample job listings
  const jobListings = [
    {
      id: 'job1',
      title: 'Senior Sales Consultant',
      department: 'sales',
      location: 'Dhaka (Flagship Showroom)',
      type: 'Full-time',
      posted: '2 days ago',
      description: 'Join our sales team to help customers find their perfect Chery vehicle. Experience in automotive sales preferred.'
    },
    {
      id: 'job2',
      title: 'Service Technician',
      department: 'service',
      location: 'Chittagong Service Center',
      type: 'Full-time',
      posted: '5 days ago',
      description: 'Skilled technician needed for our growing service center. Experience with diagnostics and repairs required.'
    },
    {
      id: 'job3',
      title: 'Digital Marketing Specialist',
      department: 'marketing',
      location: 'Dhaka (Corporate Office)',
      type: 'Full-time',
      posted: '1 week ago',
      description: 'Drive our digital marketing strategies across social media, email, and web platforms.'
    },
    {
      id: 'job4',
      title: 'Parts Inventory Manager',
      department: 'parts',
      location: 'Dhaka Distribution Center',
      type: 'Full-time',
      posted: '3 days ago',
      description: 'Manage and optimize our parts inventory system to ensure availability and efficient distribution.'
    },
    {
      id: 'job5',
      title: 'Administrative Assistant',
      department: 'admin',
      location: 'Dhaka (Corporate Office)',
      type: 'Full-time',
      posted: '1 week ago',
      description: 'Provide administrative support to our executive team. Strong organizational skills required.'
    }
  ]

  // Filter jobs based on search query and department
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  // Company values
  const companyValues = [
    {
      icon: <Star className="h-6 w-6" />,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from our vehicles to our workplace environment."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Teamwork",
      description: "We believe in collaborative effort and creating a supportive team environment."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Innovation",
      description: "We encourage fresh ideas and innovative thinking to drive our company forward."
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: theme.bgDark }}
    >
      {/* Background subtle pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
      
      {/* Decorative elements */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: theme.primary }}
        aria-hidden="true"
      />
      
      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.div 
              variants={itemVariants}
              className="h-1 w-24 mx-auto mb-6"
              style={{ backgroundColor: theme.primary }}
            />
            
            <motion.span
              variants={itemVariants}
              className="inline-block text-sm uppercase tracking-wider mb-3"
              style={{ color: theme.primary }}
            >
              Join Our Team
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6"
              style={{ color: theme.textLight }}
            >
              Career Opportunities
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="max-w-3xl mx-auto text-lg"
              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              Discover exciting career opportunities with Chery Bangladesh. Join us in our mission 
              to provide exceptional automotive experiences to our customers.
            </motion.p>
          </div>
          
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Sidebar with image and company values */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-4"
            >
              {/* Team image */}
              <div className="relative h-64 rounded-lg overflow-hidden mb-8">
                <Image 
                  src="/images/careers/team.jpg"
                  fill
                  alt="Chery Bangladesh Team"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 
                      className="text-xl font-bold"
                      style={{ color: theme.textLight }}
                    >
                      Our People
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      The heart of Chery Bangladesh
                    </p>
                  </div>
                </div>
              </div>

              {/* Company values */}
              <div 
                className="p-6 rounded-lg border border-white/10 mb-8"
                style={{ backgroundColor: 'rgba(226, 205, 184, 0.08)' }}
              >
                <h3 
                  className="text-xl font-bold mb-6 flex items-center"
                  style={{ color: theme.textLight }}
                >
                  <Briefcase style={{ color: theme.primary }} className="w-5 h-5 mr-2" />
                  Why Join Chery
                </h3>
                
                <div className="space-y-6">
                  {companyValues.map((value, index) => (
                    <div key={index} className="flex">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                        style={{ backgroundColor: 'rgba(226, 205, 184, 0.2)' }}
                      >
                        <span style={{ color: theme.primary }}>{value.icon}</span>
                      </div>
                      <div>
                        <h4 
                          className="font-medium mb-1"
                          style={{ color: theme.textLight }}
                        >
                          {value.title}
                        </h4>
                        <p 
                          className="text-sm"
                          style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                        >
                          {value.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p 
                    className="text-sm mb-4"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    We offer competitive compensation, comprehensive benefits, and ongoing professional development.
                  </p>
                  
                  <Link
                    href="/careers/benefits"
                    className="inline-flex items-center text-sm hover:underline"
                    style={{ color: theme.primary }}
                  >
                    <span>Learn about our benefits</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
              
              {/* Contact info */}
              <div 
                className="p-6 rounded-lg border border-white/10"
                style={{ backgroundColor: 'rgba(226, 205, 184, 0.08)' }}
              >
                <h3 
                  className="text-lg font-bold mb-4"
                  style={{ color: theme.textLight }}
                >
                  Have Questions?
                </h3>
                
                <p 
                  className="mb-4 text-sm"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Contact our HR department for more information about career opportunities at Chery Bangladesh.
                </p>
                
                <a 
                  href="mailto:careers@cherybangladesh.com"
                  className="inline-block text-sm hover:underline"
                  style={{ color: theme.primary }}
                >
                  careers@cherybangladesh.com
                </a>
              </div>
            </motion.div>
            
            {/* Job listings area */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-8"
            >
              {/* Search and filter */}
              <div className="mb-8 space-y-4">
                {/* Search input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for job titles, locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-white/5 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ color: theme.textLight }}
                  />
                </div>
                
                {/* Department filter */}
                <div className="flex flex-wrap gap-2">
                  {departments.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => setDepartmentFilter(dept.id)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        departmentFilter === dept.id 
                          ? 'bg-primary text-textDark' 
                          : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10'
                      }`}
                      style={{
                        backgroundColor: departmentFilter === dept.id ? theme.primary : 'rgba(255, 255, 255, 0.05)',
                        color: departmentFilter === dept.id ? theme.textDark : 'rgba(255, 255, 255, 0.8)'
                      }}
                    >
                      {dept.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Job listings */}
              <div className="space-y-6">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <div 
                      key={job.id}
                      className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
                    >
                      <div className="flex justify-between flex-wrap gap-4 mb-3">
                        <h3 
                          className="text-xl font-medium"
                          style={{ color: theme.textLight }}
                        >
                          {job.title}
                        </h3>
                        <span 
                          className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: theme.accentLight, color: theme.primary }}
                        >
                          {job.type}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-1" style={{ color: theme.primary }} />
                          <span>{departments.find(d => d.id === job.department)?.name || job.department}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" style={{ color: theme.primary }} />
                          <span>{job.location}</span>
                        </div>
                        <div>Posted: {job.posted}</div>
                      </div>
                      
                      <p 
                        className="mb-4"
                        style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        {job.description}
                      </p>
                      
                      <Link
                        href={`/careers/job/${job.id}`}
                        className="inline-flex items-center mt-2 font-medium hover:underline"
                        style={{ color: theme.primary }}
                      >
                        <span>View Details & Apply</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div 
                    className="p-8 text-center bg-white/5 border border-white/10 rounded-lg"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    <p className="mb-2">No job openings match your search criteria.</p>
                    <p>Please try another search or check back later for new opportunities.</p>
                  </div>
                )}
              </div>
              
              {/* Bottom CTA */}
              <div 
                className="mt-10 p-6 rounded-lg text-center"
                style={{ backgroundColor: 'rgba(226, 205, 184, 0.08)' }}
              >
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: theme.textLight }}
                >
                  Don't see a position that fits your skills?
                </h3>
                <p
                  className="mb-6"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  We're always looking for talented individuals to join our team. 
                  Submit your resume for future consideration.
                </p>
                <Link
                  href="/careers/general-application"
                  className="inline-block py-3 px-6 font-medium rounded-lg transition-all duration-300"
                  style={{ 
                    backgroundColor: theme.primary,
                    color: theme.textDark
                  }}
                >
                  Submit General Application
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Internship program section */}
          <motion.div 
            variants={itemVariants}
            className="mt-16"
          >
            <div className="relative rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src="/images/careers/internship.jpg"
                    alt="Chery Bangladesh Internship Program"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div 
                  className="p-8 md:p-10 flex flex-col justify-center"
                  style={{ backgroundColor: 'rgba(226, 205, 184, 0.08)' }}
                >
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: theme.textLight }}
                  >
                    Internship Program
                  </h3>
                  <p
                    className="mb-6"
                    style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  >
                    Are you a student or recent graduate looking to gain valuable experience in the automotive industry? 
                    Our internship program offers hands-on experience across various departments, from engineering to 
                    marketing and sales.
                  </p>
                  <div className="mt-auto">
                    <Link
                      href="/careers/internships"
                      className="inline-flex items-center font-medium hover:underline"
                      style={{ color: theme.primary }}
                    >
                      <span>Learn more about our internship opportunities</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative element */}
      <div 
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ 
          background: `linear-gradient(to right, transparent, ${theme.primary}44, transparent)`
        }}
        aria-hidden="true"
      />
    </section>
  )
}

export default CareersSection